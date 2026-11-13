import type { ReactNode } from "react";

export default function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h1>
      {children ? (
        <div className="mt-4 text-lg text-[var(--color-muted)]">{children}</div>
      ) : null}
    </header>
  );
}