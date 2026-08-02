import React from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StatusChip from "@/components/ui/StatusChip";
import { mockMarketplacePosts } from "@/lib/mock-data";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink mb-2">Learning Marketplace</h1>
          <p className="text-ink-soft">
            Discover learning opportunities from students and connect with talent
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="search"
            placeholder="Search learning goals..."
            className="flex-1 px-4 py-2 rounded-md border border-line bg-bg-elevated text-ink placeholder:text-ink-lighter focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="flex gap-2">
            <Button variant="secondary" size="md">
              Filters
            </Button>
            <Button variant="secondary" size="md">
              View: Grid
            </Button>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="success" size="sm">
            Published
          </Badge>
          <Badge variant="info" size="sm">
            Recent
          </Badge>
          <Badge variant="warning" size="sm">
            High Engagement
          </Badge>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMarketplacePosts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border border-line bg-bg-elevated overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-line">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-ink line-clamp-2 flex-1">
                    {post.title}
                  </h3>
                  <StatusChip
                    status={post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    color={
                      post.status === "published"
                        ? "ok"
                        : post.status === "draft"
                          ? "ink-soft"
                          : "info"
                    }
                  />
                </div>
                <p className="text-sm text-ink-soft line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              {/* Skills */}
              <div className="px-6 py-3 bg-bg-muted flex flex-wrap gap-2">
                {post.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block px-2 py-1 bg-brand-soft text-brand-ink text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span className="text-ink-soft">
                    {post.offersReceived} offers
                  </span>
                  <span className="text-ink-soft">
                    {Math.floor((Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24))}d ago
                  </span>
                </div>
                <span className="font-semibold text-brand">
                  {(post.budget / 1000000).toFixed(1)}M VND
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            ← Previous
          </Button>
          <span className="text-sm text-ink-soft">Page 1 of 5</span>
          <Button variant="secondary" size="sm">
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
