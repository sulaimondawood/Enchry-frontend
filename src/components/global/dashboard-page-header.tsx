import React from "react";

type DashboardPageHeaderProps = {
  title: string;
  description?: string;
};

export function DashboardPageHeader({
  title,
  description,
}: DashboardPageHeaderProps) {
  return (
    <div className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </header>
    </div>
  );
}
