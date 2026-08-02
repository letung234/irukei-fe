import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <header className="bg-bg-elevated border-b border-line sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-brand">Irukei</h1>
            <div className="hidden md:flex gap-6">
              <a
                href="#marketplace"
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                Marketplace
              </a>
              <a
                href="#pricing"
                className="text-sm text-ink-soft hover:text-ink transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm text-ink hover:bg-bg-muted rounded-md transition-colors"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 text-sm bg-brand text-white rounded-md hover:bg-brand-ink transition-colors"
            >
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-bg-elevated border-t border-line mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-ink mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li><a href="#" className="hover:text-ink">Marketplace</a></li>
                <li><a href="#" className="hover:text-ink">Pricing</a></li>
                <li><a href="#" className="hover:text-ink">For Students</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li><a href="#" className="hover:text-ink">About</a></li>
                <li><a href="#" className="hover:text-ink">Blog</a></li>
                <li><a href="#" className="hover:text-ink">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li><a href="#" className="hover:text-ink">Privacy</a></li>
                <li><a href="#" className="hover:text-ink">Terms</a></li>
                <li><a href="#" className="hover:text-ink">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-ink mb-4">Language</h4>
              <p className="text-sm text-ink-soft">English (US)</p>
            </div>
          </div>
          <div className="border-t border-line pt-8 text-center text-sm text-ink-soft">
            <p>&copy; 2024 Irukei Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
