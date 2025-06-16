import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm  shadow-[#c9184a]/5">
        <AlertCircleIcon className="size-10  text-red-600" />
        <div className="flex flex-col items-center justify-center gap-y-2 text-center">
            <h6 className="text-lg text-red-500 font-normal">{title}</h6>
            <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};
