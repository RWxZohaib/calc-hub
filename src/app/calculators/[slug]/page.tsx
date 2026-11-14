import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import FuelCostForm from "@/components/calculator/FuelCostForm";
import GpaForm from "@/components/calculator/GpaForm";
import UsSalesTaxForm from "@/components/calculator/UsSalesTaxForm";
import CanadaSalesTaxForm from "@/components/calculator/CanadaSalesTaxForm";
import { calculators, getCalculatorBySlug } from "@/calculators/registry";

type Props = {
  params: Promise<{ slug: string }>;
};

// Tells the build which calculator pages to create.
export function generateStaticParams() {
  return calculators.map((calculator) => ({ slug: calculator.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return { title: "Calculator not found" };
  }

  return {
    title: calculator.name,
    description: calculator.summary,
    alternates: {
      canonical: `/calculators/${calculator.slug}`,
    },
  };
}

// Each calculator has its own form. The slug decides which one appears.
function renderForm(slug: string) {
  switch (slug) {
    case "hourly-to-annual-salary":
      return <CalculatorForm />;
    case "fuel-cost":
      return <FuelCostForm />;
    case "gpa":
      return <GpaForm />;
    case "us-sales-tax":
      return <UsSalesTaxForm />;
    case "canada-sales-tax":
      return <CanadaSalesTaxForm />;
    default:
      return null;
  }
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const related = (calculator.relatedSlugs ?? [])
    .map((relatedSlug) => getCalculatorBySlug(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => item !== undefined);

  const lastChecked = calculator.lastChecked
    ? new Date(`${calculator.lastChecked}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;

  return (
    <Container>
      <PageIntro title={calculator.name}>
        <p>{calculator.summary}</p>
      </PageIntro>

      {renderForm(calculator.slug)}

      <div className="mt-12 space-y-10 text-[var(--color-ink)]">
        <section aria-labelledby="formula-heading">
          <h2 id="formula-heading" className="text-2xl font-semibold">
            How the result is calculated
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6">
            {calculator.formulaSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="example-heading">
          <h2 id="example-heading" className="text-2xl font-semibold">
            Worked example
          </h2>
          <p className="mt-4">{calculator.workedExample}</p>
        </section>

        <section aria-labelledby="limits-heading">
          <h2 id="limits-heading" className="text-2xl font-semibold">
            What this result does and does not include
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {calculator.limitations.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-6">
            {calculator.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-semibold">
              Related calculators
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/calculators/${item.slug}`}
                    className="font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-2xl font-semibold">
            Sources and last check
          </h2>
          <p className="mt-4">
            This calculator uses standard arithmetic only. The formula is recorded in the
            project&apos;s formula sources file, and the page is reviewed before each change.
            {lastChecked ? ` Last checked: ${lastChecked}.` : null}
          </p>
        </section>
      </div>
    </Container>
  );
}