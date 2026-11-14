import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Accurate US and Canadian Calculators",
  description:
    "Free calculators for US and Canadian users, with the rules explained and results labelled as estimates where needed.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <Container>
      <PageIntro title="Accurate US and Canadian calculators, with the rules explained">
        <p>
          calc-hub offers practical calculators for the United States and Canada. Each
          calculator shows its formula, its assumptions, and where its figures come from.
        </p>
      </PageIntro>

      <section aria-labelledby="calc-heading" className="mb-10">
        <Card title="Five calculators are available now">
          <p>
            Hourly to annual salary, fuel cost, GPA, US sales tax, and Canada GST, HST, and PST.
            Each calculator states its limits and the date its rates were last checked.
          </p>
          <p className="mt-4">
            <Link
              href="/calculators"
              className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
            >
              See all calculators
            </Link>
          </p>
        </Card>
      </section>

      <section aria-labelledby="trust-heading" className="mb-10 space-y-6">
        <h2 id="trust-heading" className="sr-only">
          How we work
        </h2>
        <Card title="Where our rates come from">
          <p>
            Tax rates are taken from official government sources. Each rate shows the date it
            was last checked.
          </p>
        </Card>
        <Card title="Estimates are labelled">
          <p>
            Where a result depends on your location or on averages, the page says so clearly.
          </p>
        </Card>
        <Card title="Read how we check our numbers">
          <p>
            Our Methodology page explains how formulas are verified and how changes are
            recorded.
          </p>
          <p className="mt-4">
            <Link
              href="/methodology"
              className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
            >
              Read the Methodology
            </Link>
          </p>
        </Card>
      </section>
    </Container>
  );
}