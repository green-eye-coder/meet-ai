import { db } from "@/db";
import { meetings, agents } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import {
  // CallEndedEvent,
  // MessageNewEvent,
  // CallTranscriptionReadyEvent,
  // CallRecordingReadyEvent,
  // CallSessionParticipantJoinedEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";

import { and, eq, not } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

// Verifies the webhook signature using the Stream Video SDK
function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

// Handles incoming POST requests (webhooks)
export async function POST(request: NextRequest) {
  // Extracts signature and API key from headers
  const signature = request.headers.get("x-signature");
  const apiKey = request.headers.get("x-api-key");

  // Checks for missing headers
  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: "Missing signature or API key" },
      { status: 400 }
    );
  }

  // Reads the raw request body as text
  const body = await request.text();

  // Verifies the webhook signature
  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: unknown;
  try {
    // Parses the request body as JSON
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  // Extracts the event type from the payload
  const eventType = (payload as Record<string, unknown>)?.type;

  // Handles the "call.session_started" event
  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    // Checks for missing meetingId
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId in call session started event" },
        { status: 400 }
      );
    }

    // Looks up the meeting in the database, ensuring it's not already completed, active, cancelled, or processing
    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    // Returns error if meeting not found
    if (!existingMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }

    // Updates the meeting status to "active" and sets the start time
    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    // Looks up the agent associated with the meeting
    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    // Returns error if agent not found
    if (!existingAgent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Initializes a call object for the meeting
    const call = streamVideo.video.call("default", meetingId);

    // Connects to OpenAI for real-time AI agent support
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: existingAgent.id,
    });

    // Updates the AI agent session with specific instructions
    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    // Extracts meetingId from the call_cid (format: "call:meetingId")
    const meetingId = event.call_cid.split(":")[1];

    // Checks for missing meetingId
    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meetingId in participant left event" },
        { status: 400 }
      );
    }

    // Ends the call for the meeting
    const call = streamVideo.video.call("default", meetingId);
    await call.end();
  }

  // Returns a generic success response
  return NextResponse.json({ status: "ok" });
}
