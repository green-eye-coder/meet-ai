import { Button } from "@/components/ui/button";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ListEndIcon, ListVideo, LogInIcon, LogOut } from "lucide-react";
import Link from "next/link";

export const CallEnded = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-radial from-[#860e30] via-[#820e2f] to-[#590d22]">
      <div className="py-4 px-8 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">You have ended the call</h6>
            <p className="text-sm">Summary will appear in a few minutes</p>
          </div>
          <Button>
            <Link href="/meetings" className="flex items-center gap-2">
              <LogOut />
              Back to Meetings
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
