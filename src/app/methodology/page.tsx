import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How calc-hub will check formulas, tax rates, and other figures, and how changes are recorded.",
  alternates: {
    canonical: "/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <Container>
      <PageIntro title="How we check our numbers">
        <p>
          This page explains the process we follow before a calculator is published, and how
          we keep it accurate afterwards.
        </p>
      </PageIntro>

      <div className="space-y-8 text-[var(--color-ink)]">
        <section>
          <h2 className="text-2xl font-semibold">1. Find an official source</h2>
          <p className="mt-3">
            Every formula and rate must come from a reliable source. For tax rates, we use
            official government sources, such as the Canada Revenue Agency and provincial or
            state revenue departments. We do not rely on memory or on other calculators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Test the calculation</h2>
          <p className="mt-3">
            We check each calculator with known examples, edge cases, invalid inputs, and
            rounding. Results are compared with trusted reference values before publication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. State the assumptions</h2>
          <p className="mt-3">
            Each calculator lists its assumptions and limits on the page, so you can see what a
            result does and does not include.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Record the date</h2>
          <p className="mt-3">
            Each tax rate or rule shows the date it was last checked. When a rate changes, we
            update it and record the change.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. Review regularly</h2>
          <p className="mt-3">
            We review published calculators and their sources on a regular schedule. If you find
            an error, please let us know through the Contact page once a contact method is
            available.
          </p>
        </section>
      </div>
    </Container>
  );
}