import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for does not exist on calc-hub.",
};

export default function NotFound() {
  return (
    <Container>
      <PageIntro title="Page not found">
        <p>
          The address you followed does not exist, or the page has moved.
        </p>
      </PageIntro>

      <p className="text-[var(--color-ink)]">
        You can return to the{" "}
        <Link
          href="/"
          className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
        >
          homepage
        </Link>{" "}
        or read our{" "}
        <Link
          href="/methodology"
          className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
        >
          Methodology
        </Link>
        .
      </p>
    </Container>
  );
}