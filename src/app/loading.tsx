import { Loader2Icon } from "lucide-react";

// app/loading.tsx
export default function Loading() {
  return (
    
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm  shadow-[#c9184a]/5">
            <Loader2Icon className="size-10 animate-spin text-primary" />
            </div>
            </div>
  );
}
