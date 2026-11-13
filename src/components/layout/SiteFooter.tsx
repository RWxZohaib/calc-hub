import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2">
        <div>
          <p className="font-semibold text-[var(--color-ink)]">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {siteConfig.description}
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Company</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="text-[var(--color-brand)] hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--color-brand)] hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[var(--color-ink)]">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/privacy" className="text-[var(--color-brand)] hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--color-brand)] hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-[var(--color-brand)] hover:underline">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <p className="pb-6 text-center text-xs text-[var(--color-muted)]">
        © {year} {siteConfig.name}. Results are estimates unless stated otherwise.
      </p>
    </footer>
  );
}