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
          calc-hub is building a set of practical calculators for the United States and
          Canada. Each calculator shows its formula, its assumptions, and where its
          figures come from.
        </p>
      </PageIntro>

      <section aria-labelledby="status-heading" className="mb-10">
        <Card title="Our first calculators are coming soon">
          <p>
            The first five calculators will launch in our next release. Until then, this
            site contains only information pages, so there is nothing to calculate yet.
          </p>
        </Card>
      </section>

      <section aria-labelledby="trust-heading" className="mb-10 space-y-6">
        <h2 id="trust-heading" className="sr-only">
          How we work
        </h2>
        <Card title="Where our rates come from">
          <p>
            Tax rates are taken from official government sources. Each rate will show the
            date it was last checked.
          </p>
        </Card>
        <Card title="Estimates are labelled">
          <p>
            Where a result depends on your location or on averages, the page will say so
            clearly.
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