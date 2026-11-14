import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Card from "@/components/ui/Card";
import { calculators } from "@/calculators/registry";
import { CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "All calculators",
  description:
    "Every calc-hub calculator, grouped by category: pay, sales tax, GST and HST, fuel, and grades.",
  alternates: {
    canonical: "/calculators",
  },
};

export default function CalculatorsIndexPage() {
  return (
    <Container>
      <PageIntro title="All calculators">
        <p>Choose a calculator. Each one explains its formula, its limits, and its sources.</p>
      </PageIntro>

      <div className="space-y-10">
        {CATEGORIES.map((category) => {
          const inCategory = calculators.filter((c) => c.category === category.slug);
          if (inCategory.length === 0) {
            return null;
          }
          return (
            <section key={category.slug} aria-labelledby={`cat-${category.slug}`}>
              <h2 id={`cat-${category.slug}`} className="text-2xl font-semibold text-[var(--color-ink)]">
                {category.name}
              </h2>
              <p className="mt-2 text-[var(--color-muted)]">{category.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {inCategory.map((calculator) => (
                  <Card key={calculator.slug} title={calculator.name}>
                    <p>{calculator.summary}</p>
                    <p className="mt-4">
                      <Link
                        href={`/calculators/${calculator.slug}`}
                        className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
                      >
                        Open the {calculator.name}
                      </Link>
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}