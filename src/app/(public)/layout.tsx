import React from "react";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <header className="bg-bg-elevated/90 backdrop-blur border-b border-line sticky top-0 z-50">
        <nav className="max-w-[70rem] mx-auto h-14 md:h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-display text-2xl font-semibold text-brand-ink">
              Irukei
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                href="/marketplace"
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                Marketplace
              </Link>
              <a
                href="#how"
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                How it works
              </a>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 text-sm text-ink hover:bg-bg-muted rounded-md transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 text-sm bg-brand text-white rounded-md hover:bg-brand-ink transition-colors"
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-bg-elevated border-t border-line mt-16">
        <div className="max-w-[70rem] mx-auto py-10 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-ink mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <Link href="/marketplace" className="hover:text-ink">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/ui" className="hover:text-ink">
                    Design system
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-3">Apps</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <Link href="/app/student/dashboard" className="hover:text-ink">
                    Student
                  </Link>
                </li>
                <li>
                  <Link href="/app/company/dashboard" className="hover:text-ink">
                    Company
                  </Link>
                </li>
                <li>
                  <Link href="/app/org/roles" className="hover:text-ink">
                    Org admin
                  </Link>
                </li>
                <li>
                  <Link href="/admin/system-health" className="hover:text-ink">
                    System admin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li>
                  <span className="hover:text-ink">Privacy</span>
                </li>
                <li>
                  <span className="hover:text-ink">Terms</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-3">Language</h4>
              <p className="text-sm text-ink-soft">English (US)</p>
            </div>
          </div>
          <div className="border-t border-line pt-6 text-center text-sm text-ink-soft">
            <p>© {new Date().getFullYear()} Irukei. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
