import { Loader2Icon,Loader  } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm  shadow-[#c9184a]/5">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <div className="flex flex-col items-center justify-center gap-y-2 text-center">
            <h6 className="text-lg font-normal">{title}</h6>
            <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
