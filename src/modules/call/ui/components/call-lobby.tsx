import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

interface Props {
  onJoin: () => void;
}

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm text-muted-foreground">
      Please allow camera and microphone permissions in your browser settings.
    </p>
  );
};

export const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex h-full flex-col items-center justify-center bg-radial from-[#860e30] via-[#820e2f] to-[#590d22]">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to Join ?</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>

          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex gap-x-2">
           <ToggleVideoPreviewButton/>
           <ToggleAudioPreviewButton/>
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button
            variant={"ghost"}
            >
                <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
                <LogInIcon/>
                Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
