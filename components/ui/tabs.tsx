"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  defaultValue,
  children,
  onChange
}: {
  tabs: { value: string; label: string }[];
  defaultValue: string;
  children: (active: string) => React.ReactNode;
  onChange?: (value: string) => void;
}) {
  const [active, setActive] = React.useState(defaultValue);

  function select(value: string) {
    setActive(value);
    onChange?.(value);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-md border bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => select(tab.value)}
            className={cn(
              "focus-ring min-h-10 rounded-md px-4 text-sm font-semibold transition",
              active === tab.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{children(active)}</div>
    </div>
  );
}
