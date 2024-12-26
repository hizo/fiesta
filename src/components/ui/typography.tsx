import { cn } from "@/lib/utils";
import { ElementType, PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren<{
  as?: ElementType;
  className?: string;
}>;

export function TypographyH1({ children, as, className }: TypographyProps) {
  const Tag = as ?? "h1";
  return (
    <Tag
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
export function TypographyH2({ children, as, className }: TypographyProps) {
  const Tag = as ?? "h2";
  return (
    <Tag
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
export function TypographyH3({ children, as, className }: TypographyProps) {
  const Tag = as ?? "h3";
  return (
    <Tag
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
export function TypographyH4({ children, as, className }: TypographyProps) {
  const Tag = as ?? "h4";
  return (
    <Tag
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
export function TypographyP({ children, as, className }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className={cn("leading-7", className)}>{children}</Tag>;
}
export function TypographyLead({ children, as, className }: TypographyProps) {
  const Tag = as ?? "p";
  return (
    <Tag className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </Tag>
  );
}
export function TypographyLarge({ children, as, className }: TypographyProps) {
  const Tag = as ?? "p";
  return (
    <Tag className={cn("text-lg font-semibold", className)}>{children}</Tag>
  );
}
export function TypographySmall({ children, as, className }: TypographyProps) {
  const Tag = as ?? "p";
  return (
    <Tag className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </Tag>
  );
}
export function TypographyMuted({ children, as, className }: TypographyProps) {
  const Tag = as ?? "p";
  return (
    <Tag className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </Tag>
  );
}
