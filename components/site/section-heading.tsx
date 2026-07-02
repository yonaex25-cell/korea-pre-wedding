import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-3", align === "center" && "mx-auto text-center")}> 
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold leading-tight text-ink md:text-5xl">{title}</h2>
      {description ? <p className="text-base leading-8 text-muted-foreground md:text-lg">{description}</p> : null}
    </div>
  );
}
