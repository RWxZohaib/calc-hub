import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "About calc-hub: what the site is for, how it is built, and what it does not do.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <Container>
      <PageIntro title="About calc-hub">
        <p>
          calc-hub is an independent project that aims to provide accurate, clearly explained
          calculators for people in the United States and Canada.
        </p>
      </PageIntro>

      <div className="space-y-6">
        <Card title="What we do">
          <p>
            We build calculators for everyday money, work, and study questions where the
            rules differ between the two countries. Each calculator will explain its formula
            and its assumptions.
          </p>
        </Card>
        <Card title="What we do not do">
          <p>
            calc-hub does not give tax, legal, or financial advice. Our results are
            calculations based on the inputs you enter and the rules we publish. For decisions
            that matter to you, please check with a qualified professional.
          </p>
        </Card>
        <Card title="How the site is built">
          <p>
            The site has no user accounts and no paid features. It runs in your web browser,
            so the numbers you type are calculated on your device.
          </p>
        </Card>
      </div>
    </Container>
  );
}