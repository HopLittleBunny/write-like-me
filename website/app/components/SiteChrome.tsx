import Link from "next/link";
import { withBasePath } from "../lib/paths";

const githubUrl = "https://github.com/HopLittleBunny/write-like-me";

const navigation = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#downloads", label: "Downloads" },
  { href: "/test#quick-start", label: "Quick start" },
  { href: "/test#feedback", label: "Feedback" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Write Like Me home">
          <span className="brand-mark" aria-hidden="true">
            W
          </span>
          <span>Write Like Me</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
        <Link className="button button-small button-dark header-cta" href="/#downloads">
          Download
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">
              W
            </span>
            <span>Write Like Me</span>
          </div>
          <p>Keep the meaning. Keep the facts. Sound more like yourself.</p>
        </div>
        <div className="footer-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
          <Link href="/#downloads">Download</Link>
          <Link href="/test#quick-start">Quick start</Link>
          <Link href="/test">Full tester guide</Link>
          <Link href="/test#feedback">Share feedback</Link>
          <a href={withBasePath("/downloads/FREE-BETA-TESTER-GUIDE.md")} download>
            Download guide
          </a>
        </div>
        <p className="footer-note">
          Open source · MIT licensed
          <br />
          v1.0.0-rc.4 · English
        </p>
      </div>
    </footer>
  );
}
