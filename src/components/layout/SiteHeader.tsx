import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function SiteHeader() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-[var(--color-ink)] focus:shadow"
      >
        Skip to main content
      </a>
      <header className="border-b border-[var(--color-line)] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
          >
            {siteConfig.name}
          </Link>
          <nav aria-label="Main navigation">
            <ul className="flex gap-6 text-base">
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-ink)] hover:text-[var(--color-brand-dark)] hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[var(--color-ink)] hover:text-[var(--color-brand-dark)] hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}