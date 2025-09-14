// components/SiteChrome.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/templates", label: "Templates" },
  { href: "/jobs", label: "Jobs" },
  { href: "/exports", label: "Exports" },
  { href: "/settings", label: "Settings" },
];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="ui-wrap">
      <aside className="ui-aside">
        <div className="brand">
          {/* NEW BRAND NAME HERE */}
          <span className="logo-dot" />
          <span className="brand-name">ViralClip</span>
        </div>

        <nav className="nav">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link key={n.href} href={n.href} className={active ? "nav-link active" : "nav-link"}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="aside-foot">
          <a
            className="small-link"
            href="mailto:support@example.com"
            rel="noopener noreferrer"
          >
            Support
          </a>
        </div>
      </aside>

      <main className="ui-main">{children}</main>
    </div>
  );
}
