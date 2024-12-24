import { ElementType, PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren<{
  as?: ElementType;
}>;

export function TypographyH1({ children, as }: TypographyProps) {
  const Tag = as ?? "h1";
  return (
    <Tag className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </Tag>
  );
}
export function TypographyH2({ children, as }: TypographyProps) {
  const Tag = as ?? "h2";
  return (
    <Tag className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </Tag>
  );
}
export function TypographyH3({ children, as }: TypographyProps) {
  const Tag = as ?? "h3";
  return (
    <Tag className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </Tag>
  );
}
export function TypographyH4({ children, as }: TypographyProps) {
  const Tag = as ?? "h4";
  return (
    <Tag className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </Tag>
  );
}
export function TypographyP({ children, as }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className="leading-7 [&:not(:first-child)]:mt-6">{children}</Tag>;
}
export function TypographyLead({ children, as }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className="text-xl text-muted-foreground">{children}</Tag>;
}
export function TypographyLarge({ children, as }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className="text-lg font-semibold">{children}</Tag>;
}
export function TypographySmall({ children, as }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className="text-sm font-medium leading-none">{children}</Tag>;
}
export function TypographyMuted({ children, as }: TypographyProps) {
  const Tag = as ?? "p";
  return <Tag className="text-sm text-muted-foreground">{children}</Tag>;
}
