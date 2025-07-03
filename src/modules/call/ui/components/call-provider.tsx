"use client";

import {LoaderIcon} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { CallConnect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface Props{
    meetingId: string;
    meetingName: string;
};

export const CallProvider = ({ meetingId, meetingName }: Props) => {

    const {data,isPending}=authClient.useSession();

    if(!data || isPending){
        return (
          <div className="flex h-screen items-center justify-center bg-radial from-[#a4133c] via-[#981a3e] to-[#590d22]">
            <LoaderIcon className="size-10 text-white animate-spin " />
          </div>
        );
    };

    return (
       <CallConnect
        meetingId={meetingId} 
        meetingName={meetingName} 
        userId={data.user.id} 
        userName={data.user.name} 
        userImage={
            data.user.image ?? generateAvatarUri({
                seed:data.user.name,variant:"initials"
            })
        }
       />
    )
}