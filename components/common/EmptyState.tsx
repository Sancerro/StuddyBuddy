import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = FileQuestion
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 border-dashed">
      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

