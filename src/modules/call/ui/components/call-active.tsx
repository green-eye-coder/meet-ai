import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props{
    onLeave: () => void;
    meetingName: string;
}

export const CallAcive=({onLeave,meetingName}:Props)=>{
    return (
      <div className="flex flex-col justify-content-between p-4 h-full text-white">
        <div className="bg-[#3e3e42] rounded-full p-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex item-center justify-center p-1 bg-black/15 rounded-full w-fit"
          >
            <Image
              src="/logo/logo_light.svg"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <h4 className="text-base">{meetingName}</h4>
        </div>
        <SpeakerLayout />
        <div className="bg-[#3e3e42] rounded-full px-4">
          <CallControls onLeave={onLeave} />
        </div>
      </div>
    );
}