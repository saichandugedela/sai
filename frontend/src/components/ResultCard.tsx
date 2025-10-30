import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  type: "success" | "warning" | "error";
  title: string;
  description: string;
  value?: string | number;
}

export const ResultCard = ({ type, title, description, value }: ResultCardProps) => {
  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  };

  const colors = {
    success: "border-success/50 bg-success/10",
    warning: "border-warning/50 bg-warning/10",
    error: "border-destructive/50 bg-destructive/10",
  };

  const Icon = icons[type];

  return (
    <div className={cn("glass-card p-6 rounded-xl border-2 smooth-transition hover-glow", colors[type])}>
      <div className="flex items-start gap-4">
        <Icon className={cn("w-8 h-8 flex-shrink-0", {
          "text-success": type === "success",
          "text-warning": type === "warning",
          "text-destructive": type === "error",
        })} />
        
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-heading font-semibold">{title}</h3>
          {value !== undefined && (
            <p className="text-3xl font-bold gradient-text">{value}</p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
