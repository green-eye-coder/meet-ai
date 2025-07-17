import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingGetOne } from "../../types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import Markdown from "react-markdown";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { formatDuration } from "@/lib/utils";

import {
  BookOpenTextIcon,
  SparklesIcon,
  FileTextIcon,
  FileVideoIcon,
  ClockFadingIcon,
  CircleArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}
export const CompletedState = ({ data }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 ">
      <Tabs defaultValue="summary">
        <div className="bg-white rounded-lg border px-3">
          <ScrollArea>
            <TabsList className="p-0 mx-6 bg-background  rounded-none h-13">
              <TabsTrigger
                value="summary"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none 
                border-b-2 border-transparent data-[state=active]:border-b-primary 
                data-[state=active]:text-accent-foreground h-full hover:text-primary/80"
              >
                <BookOpenTextIcon className="text-primary" />
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none 
                border-b-2 border-transparent data-[state=active]:border-b-primary 
                data-[state=active]:text-accent-foreground h-full hover:text-primary/80"
              >
                <FileTextIcon className="text-primary" />
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="recording"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none 
                border-b-2 border-transparent data-[state=active]:border-b-primary 
                data-[state=active]:text-accent-foreground h-full hover:text-primary/80"
              >
                <FileVideoIcon className="text-primary" />
                Recording
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none 
                border-b-2 border-transparent data-[state=active]:border-b-primary 
                data-[state=active]:text-accent-foreground h-full hover:text-primary/80"
              >
                <SparklesIcon className="text-primary" />
                Ask AI
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="h-1" />
          </ScrollArea>
        </div>
        <TabsContent value="transcript">
          <Transcript meetingId={data.id} />
        </TabsContent>
        <TabsContent value="recording">
          <div className="bg-white rounded-lg border px-4 py-5">
            <p className="text-muted-foreground text-sm m-3">
              Note: This recorded video will expire in 2 weeks and will no
              longer be available after that.
            </p>
            <video
              src={data.recordingUrl!}
              title="Meeting Recording"
              className="w-full rounded-lg  border-primary outline-2 outline-offset-2"
              controls
            />
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <div className="bg-white rounded-lg border px-4 py-5">
            <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
              <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
              <div className="flex gap-x-2 items-center">
                <Link
                  href={`/agents/${data.agent.id}`}
                  className="flex items-center gap-x-2 text-primary underline underline-offset-4 capitalize"
                >
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agent.name}
                    className="size-5"
                  />
                  {data.agent.name}
                </Link>{" "}
                <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <SparklesIcon className="size-5" />
                <p>General Summary</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-x-2 [&>svg]:size-4"
              >
                <ClockFadingIcon className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  {data.duration ? formatDuration(data.duration) : "N/A"}
                </span>
              </Badge>
              <ScrollArea className="h-[400px] w-full border p-3 rounded-lg border-gray-300">
                <div className="prose prose-sm max-w-none pr-4 ">
                  <Markdown
                    components={{
                      h1: (props) => (
                        <h1
                          className="text-2xl font-medium mb-6 text-primary"
                          {...props}
                        />
                      ),
                      h2: (props) => (
                        <h2 className="text-xl font-medium mb-6" {...props} />
                      ),
                      h3: (props) => (
                        <h3 className="text-lg font-semibold mb-6" {...props} />
                      ),
                      h4: (props) => (
                        <h4
                          className="text-base font-semibold mt-6"
                          {...props}
                        />
                      ),
                      p: (props) => (
                        <p className="mb-6 leading-relaxed" {...props} />
                      ),
                      ul: (props) => (
                        <ul
                          className="list-dics list-inline leading-relaxed"
                          {...props}
                        />
                      ),
                      ol: (props) => (
                        <ol
                          className="list-decimal list-inline leading-relaxed"
                          {...props}
                        />
                      ),
                      li: (props) => <li className="mb-1" {...props} />,
                      code: (props) => (
                        <code
                          className="bg-gray-100  dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-primary"
                          {...props}
                        />
                      ),
                      strong: (props) => (
                        <strong className="font-semibold" {...props} />
                      ),
                      blockquote: (props) => (
                        <blockquote
                          className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-6"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {data.summary ? data.summary : "No summary available."}
                  </Markdown>
                </div>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="chat">
          <ChatProvider meetingId={data.id} meetingName={data.name} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
