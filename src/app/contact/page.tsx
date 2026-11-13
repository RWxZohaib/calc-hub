import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to contact calc-hub. A contact method will be added in a future update.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Container>
      <PageIntro title="Contact calc-hub">
        <p>
          We are still setting up how people can get in touch with us.
        </p>
      </PageIntro>

      <Card title="Contact method coming soon">
        <p>
          This page does not yet offer a working contact method. We will update it when one
          is available.
        </p>
        <p className="mt-4">
          For questions about information this site holds, please see our Privacy Policy.
        </p>
      </Card>
    </Container>
  );
}