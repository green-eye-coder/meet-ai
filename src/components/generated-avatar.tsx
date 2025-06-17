import { createAvatar } from "@dicebear/core";
import { adventurerNeutral, initials, glass,botttsNeutral  } from "@dicebear/collection";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant: "adventurerNeutral" | "initials" | "glass"| "botttsNeutral";
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar;
  if (variant === "adventurerNeutral") {
    avatar = createAvatar(adventurerNeutral, {
      seed,
    });
  } else if (variant === "initials") {
    avatar = createAvatar(initials, {
      seed,
      fontWeight:500,
        fontSize: 42,
    });
  }else if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  }
   else {
    avatar = createAvatar(glass, {
      seed,
    });
  }

  return(
    <Avatar className={cn(className)}>
    <AvatarImage src={avatar.toDataUri()} alt="avatar"/>
    <AvatarFallback/>       
    </Avatar>

  )
};
