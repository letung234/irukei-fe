import React from "react";
import Button from "@/components/ui/Button";
import { mockMarketplacePosts } from "@/lib/mock-data";

export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft via-bg to-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6 leading-tight">
              AI-Powered Learning
              <span className="block text-brand">Meets Real Opportunities</span>
            </h1>
            <p className="text-lg text-ink-soft mb-8">
              Get personalized learning roadmaps powered by AI. Connect with mentors,
              companies, and career opportunities tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="sm:px-8"
              >
                I'm a Student
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="sm:px-8"
              >
                I'm Looking for Talent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-3">How It Works</h2>
          <p className="text-ink-soft">Three simple steps to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Create Your Profile",
              description:
                "Tell us your goals, skills, and interests. Our AI analyzes your profile to create a personalized learning roadmap.",
            },
            {
              step: 2,
              title: "Get Your AI Roadmap",
              description:
                "Receive a customized learning pathway with resources, milestones, and skill checkpoints tailored to your pace.",
            },
            {
              step: 3,
              title: "Connect & Grow",
              description:
                "Meet mentors, get offers from companies, and access trial opportunities to apply what you've learned.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-lg border border-line bg-bg-elevated p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand text-white text-lg font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-ink mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Marketplace Teaser */}
      <section id="marketplace" className="bg-bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink mb-3">
              Explore Learning Opportunities
            </h2>
            <p className="text-ink-soft">
              Real students sharing their goals and receiving offers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mockMarketplacePosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="rounded-lg bg-bg-elevated border border-line p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-ink mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-soft line-clamp-3 mb-4">
                    {post.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="inline-block px-2 py-1 bg-brand-soft text-brand-ink text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-soft">
                    {post.offersReceived} offers
                  </span>
                  <span className="font-semibold text-brand">
                    {post.budget.toLocaleString()} VND
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="ghost" size="md">
              View All Opportunities →
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ink mb-3">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does the AI generate my learning roadmap?",
              a: "Our AI analyzes your profile, goals, and available time to create a personalized pathway with recommended resources and milestones.",
            },
            {
              q: "Is there a cost to use Irukei?",
              a: "Viewing the marketplace is free. Students earn credits through trials and offers. Some premium features may have a cost.",
            },
            {
              q: "Can I connect with mentors?",
              a: "Yes! Companies can extend mentorship offers or trial opportunities directly through the platform.",
            },
            {
              q: "How are trials structured?",
              a: "Trials are time-bound opportunities (typically 2-4 weeks) where you can explore real work or mentorship before making commitments.",
            },
            {
              q: "What payment methods are accepted?",
              a: "We support credit cards, bank transfers, and in-platform credits earned through trial completions.",
            },
          ].map((item, idx) => (
            <details
              key={idx}
              className="group rounded-lg border border-line bg-bg-elevated hover:bg-bg-hover transition-colors"
            >
              <summary className="cursor-pointer px-6 py-4 font-medium text-ink flex items-center justify-between">
                {item.q}
                <span className="text-ink-lighter group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="px-6 pb-4 text-sm text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
