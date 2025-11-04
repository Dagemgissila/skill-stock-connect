import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "primary" | "accent" | "destructive";
  disabled?: boolean;
  className?: string;
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
  disabled,
  className,
}: ActionCardProps) {
  const variantStyles = {
    default: "hover:shadow-lg hover:border-primary/50",
    primary: "border-primary/50 bg-primary/5 hover:bg-primary/10 hover:shadow-lg",
    accent: "border-accent/50 bg-accent/5 hover:bg-accent/10 hover:shadow-lg",
    destructive: "border-destructive/50 bg-destructive/5 hover:bg-destructive/10 hover:shadow-lg",
  };

  const iconVariantStyles = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/20 text-accent",
    destructive: "bg-destructive/20 text-destructive",
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300 cursor-pointer group",
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "rounded-lg p-3 transition-transform duration-300 group-hover:scale-110",
              iconVariantStyles[variant]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActionButtonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  onButtonClick: () => void;
  variant?: "default" | "primary" | "accent" | "destructive";
  disabled?: boolean;
  className?: string;
}

export function ActionButtonCard({
  title,
  description,
  icon: Icon,
  buttonText,
  onButtonClick,
  variant = "default",
  disabled,
  className,
}: ActionButtonCardProps) {
  const iconVariantStyles = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary/20 text-primary",
    accent: "bg-accent/20 text-accent",
    destructive: "bg-destructive/20 text-destructive",
  };

  const buttonVariants = {
    default: "default",
    primary: "default",
    accent: "default",
    destructive: "destructive",
  } as const;

  return (
    <Card className={cn("transition-all hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("rounded-lg p-3", iconVariantStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <Button
              onClick={onButtonClick}
              disabled={disabled}
              variant={buttonVariants[variant]}
              className="w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
