import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How calc-hub handles information when you visit the website, including the hosting provider's technical data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <Container>
      <PageIntro title="Privacy Policy">
        <p>Last updated: 14 November 2026</p>
      </PageIntro>

      <div className="space-y-8 text-[var(--color-ink)]">
        <section>
          <h2 className="text-2xl font-semibold">Hosting and technical data</h2>
          <p className="mt-3">
            This website is hosted by Cloudflare, Inc. through Cloudflare Workers. To deliver
            the pages to your browser and protect the service, Cloudflare may process
            technical information when you visit. This can include your IP address, system
            configuration information, the URL of the page that referred you, and your locale
            and language preferences. Cloudflare processes this information in data centres in
            the United States and Europe.
          </p>
          <p className="mt-3">
            Cloudflare&apos;s privacy policy describes how it handles this information, how
            long it keeps it, and your rights.
          </p>
          <p className="mt-3">
            We do not use technical information about visitors to identify individual
            visitors. We do not currently use analytics, advertising, or tracking tools on this
            website. If we add any in the future, we will update this policy before enabling
            them.
          </p>
          
          <p className="mt-3">
  At the time of our last check on 14 November 2026, no cookies were set on this
  website. Cloudflare may set cookies in the future for its security and delivery
  features. If that changes, we will update this policy.
</p>
          
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Calculator inputs</h2>
          <p className="mt-3">
            The calculators on this site run in your web browser. Information you type into a
            calculator is processed on your device, and we do not receive or store it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Contact and questions</h2>
          <p className="mt-3">
            The Contact page does not yet offer a working contact method. We will update this
            section when one is available.
          </p>
          <p className="mt-3">
            Because this website does not collect personal information directly, questions
            about data held by Cloudflare should be directed to Cloudflare.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Changes to this policy</h2>
          <p className="mt-3">
            We will update this page whenever our practices change, and we will show the new
            date at the top.
          </p>
        </section>
      </div>
    </Container>
  );
}