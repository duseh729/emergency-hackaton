import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ 
  title = "System Error", 
  message = "An unexpected error occurred while loading data.",
  onRetry 
}: ErrorMessageProps) {
  return (
    <div className="w-full py-12 px-6">
      <div className="max-w-2xl mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div className="grow">
          <h3 className="text-xl font-bebas text-red-500 tracking-wider mb-2 uppercase">{title}</h3>
          <p className="text-foreground/60 text-sm font-bold uppercase tracking-tight mb-6">{message}</p>
          
          {onRetry && (
            <button 
              onClick={onRetry}
              className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all border-none cursor-pointer mx-auto sm:mx-0"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
