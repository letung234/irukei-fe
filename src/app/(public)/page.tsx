import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MarketplacePostCard } from "@/components/domain/MarketplacePostCard";
import { mockMarketplacePosts, mockStudents } from "@/lib/mock-data";

export default function LandingPage() {
  const teaser = mockMarketplacePosts
    .filter((p) => p.status === "published")
    .slice(0, 3)
    .map((post) => {
      const student = mockStudents.find((s) => s.id === post.studentId);
      return {
        ...post,
        city: student?.city,
        studentDisplayName: student?.name.split(" ").slice(-1).join(" ")
          ? student.name
              .split(" ")
              .map((p, i, a) => (i === a.length - 1 ? p : p[0] + "."))
              .join(" ")
          : "Student",
      };
    });

  return (
    <div className="w-full">
      {/* First viewport: brand + one headline + sentence + CTAs + full-bleed atmosphere */}
      <section className="relative min-h-[min(100vh,840px)] flex items-center overflow-hidden border-b border-line">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(15,118,110,0.14), transparent 55%), radial-gradient(ellipse 70% 50% at 15% 80%, rgba(180,83,9,0.10), transparent 50%), var(--bg)",
          }}
        />
        <div className="relative w-full max-w-[70rem] mx-auto px-4 md:px-8 py-16 md:py-24">
          <p className="font-display text-3xl md:text-4xl text-brand-ink mb-6">
            Irukei
          </p>
          <h1 className="max-w-2xl text-3xl md:text-5xl font-semibold text-ink leading-tight mb-4">
            AI roadmaps that meet real learning offers
          </h1>
          <p className="max-w-xl text-base md:text-lg text-ink-soft mb-8">
            Build a study path, publish what you want next, and get offers from
            education companies — without exposing private contact data.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/login">
              <Button variant="primary" size="lg">
                I&apos;m a student
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                I&apos;m a center
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="how" className="max-w-[70rem] mx-auto px-4 md:px-8 py-16">
        <h2 className="font-display text-2xl md:text-3xl text-ink mb-2">
          How it works
        </h2>
        <p className="text-ink-soft mb-10">
          Three calm steps from goal to offer.
        </p>
        <ol className="grid md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              t: "AI roadmap",
              d: "Describe your goal. A queued generation job builds a step-by-step path.",
            },
            {
              n: "02",
              t: "Publish",
              d: "Share a public learning snapshot — skills and intent only, no email or phone.",
            },
            {
              n: "03",
              t: "Offers",
              d: "Education companies send structured offers using credit-backed workflows.",
            },
          ].map((s) => (
            <li key={s.n}>
              <p className="font-mono text-xs text-brand mb-2">{s.n}</p>
              <h3 className="text-lg font-semibold text-ink mb-2">{s.t}</h3>
              <p className="text-sm text-ink-soft">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-bg-elevated border-y border-line py-16">
        <div className="max-w-[70rem] mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-2xl text-ink mb-2">
                Marketplace teaser
              </h2>
              <p className="text-ink-soft text-sm">
                Public posts only — contact stays private until an offer is accepted.
              </p>
            </div>
            <Link href="/marketplace" className="text-sm text-brand hover:text-brand-ink shrink-0">
              Browse all
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {teaser.map((post) => (
              <MarketplacePostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[42rem] mx-auto px-4 md:px-8 py-16">
        <h2 className="font-display text-2xl text-ink mb-6">FAQ</h2>
        <div className="space-y-3">
          {[
            {
              q: "Do students pay credits for AI generation?",
              a: "Yes — generation and offer actions show credit cost before confirm. You only spend when the server confirms success.",
            },
            {
              q: "Is my email public on the marketplace?",
              a: "No. Public cards show skills, city, and learning intent. Contact opens after offer acceptance.",
            },
            {
              q: "Can companies browse without a workspace?",
              a: "Marketplace browsing is public. Sending offers requires a company workspace and credits.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="rounded-lg border border-line bg-bg-elevated group"
            >
              <summary className="cursor-pointer px-5 py-4 font-medium text-ink list-none flex justify-between gap-4">
                {item.q}
                <span className="text-ink-lighter group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
