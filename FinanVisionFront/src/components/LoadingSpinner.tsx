import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center" data-testid="loading-spinner">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
