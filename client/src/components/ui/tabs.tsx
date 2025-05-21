import * as React from "react";
import { cn } from "@/lib/utils";

type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue || items[0]?.value,
  );

  return (
    <div className={cn("w-full", className)}>
      <div className="flex border-b border-border space-x-4">
        {items.map((item) => (
          <button
            key={item.value}
            className={cn(
              "text-sm font-medium px-4 py-2 transition-colors border-b-2",
              activeTab === item.value
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
            )}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {items.map((item) =>
          item.value === activeTab ? (
            <div key={item.value} className="text-sm text-gray-700">
              {item.content}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
