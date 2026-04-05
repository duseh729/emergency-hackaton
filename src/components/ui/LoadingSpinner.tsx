import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({ message = "Loading...", fullScreen = false }: LoadingSpinnerProps) {
  const containerClass = fullScreen 
    ? "h-screen w-full flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm fixed inset-0 z-50 text-primary"
    : "w-full py-12 flex flex-col items-center justify-center text-primary/70";

  return (
    <div className={containerClass}>
      <Loader2 className="w-10 h-10 animate-spin mb-4" />
      <p className="font-bebas tracking-widest text-lg uppercase italic">{message}</p>
    </div>
  );
}
