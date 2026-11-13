import type { ReactNode } from "react";

export default function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-[var(--color-line)] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-[var(--color-ink)]">{title}</h2>
      <div className="mt-3 text-[var(--color-muted)]">{children}</div>
    </section>
  );
}