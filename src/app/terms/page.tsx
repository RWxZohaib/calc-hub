import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The basic terms for using calc-hub, including the limits on the accuracy of our calculators.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <Container>
      <PageIntro title="Terms of Use">
        <p>Last updated: 13 November 2026</p>
      </PageIntro>

      <div className="space-y-8 text-[var(--color-ink)]">
        <section>
          <h2 className="text-2xl font-semibold">Using the site</h2>
          <p className="mt-3">
            You may use calc-hub for personal and business planning. You may not use the site
            in a way that breaks the law, interferes with how it works, or harms other users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Estimates and accuracy</h2>
          <p className="mt-3">
            Our calculators give estimates based on the inputs you enter and the rules and
            rates we publish. Rates and rules change, and our information may not always be
            current or complete. Where a result depends on averages, your location, or
            individual circumstances, the page will say so.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">No professional advice</h2>
          <p className="mt-3">
            calc-hub does not provide tax, legal, or financial advice. Before making a decision
            that matters to you, please check the result with a qualified professional.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Your responsibility</h2>
          <p className="mt-3">
            You are responsible for how you use any result from this site. We are not liable
            for losses that follow from decisions made using our calculators, to the extent the
            law allows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Changes to these terms</h2>
          <p className="mt-3">
            We may update these terms. We will show the date of the latest change at the top of
            this page.
          </p>
        </section>
      </div>
    </Container>
  );
}