import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title = "No Data Found", 
  description = "There is nothing to display here yet.", 
  actionText,
  onAction,
  icon
}: EmptyStateProps) {
  return (
    <div className="w-full py-20 bg-support/5 rounded-3xl border-2 border-dashed border-support/20 flex flex-col items-center text-center px-4">
      <div className="text-support/30 mb-6">
        {icon || <FolderOpen className="w-16 h-16" />}
      </div>
      <h3 className="text-2xl font-bebas text-foreground/50 tracking-wider mb-2 uppercase">{title}</h3>
      <p className="text-foreground/40 text-sm font-bold uppercase tracking-tight max-w-md mb-6">{description}</p>
      
      {actionText && onAction && (
        <button 
          onClick={onAction}
          className="bg-primary/10 text-primary px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary/20 transition-all border-none cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
