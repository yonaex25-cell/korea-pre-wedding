import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="section-shell flex min-h-[55vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-md border bg-card px-5 py-4 shadow-sm">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm font-medium text-muted-foreground">Preparing your wedding journey...</span>
      </div>
    </div>
  );
}
