import React from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MarketplacePostCard } from "@/components/domain/MarketplacePostCard";
import { mockMarketplacePosts, mockStudents } from "@/lib/mock-data";

export default function MarketplacePage() {
  const posts = mockMarketplacePosts
    .filter((p) => p.status === "published")
    .map((post) => {
      const student = mockStudents.find((s) => s.id === post.studentId);
      return {
        ...post,
        city: student?.city,
        studentDisplayName: student?.name,
      };
    });

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-[80rem] mx-auto px-4 md:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-ink mb-2">
            Learning marketplace
          </h1>
          <p className="text-ink-soft">
            Discover student goals and connect with talent. Private contact is
            never shown on public cards.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="search"
            placeholder="Search skills or goals (e.g. Frontend Junior, IELTS 7.0)"
            className="flex-1 px-4 py-2 rounded-md border border-line bg-bg-elevated text-ink placeholder:text-ink-lighter focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="flex gap-2">
            <Button variant="secondary" size="md">
              Filters
            </Button>
            <Button variant="outline" size="md">
              Grid
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="success" size="sm">
            Published
          </Badge>
          <Badge variant="info" size="sm">
            Recent
          </Badge>
          <Badge variant="warning" size="sm">
            High engagement
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <MarketplacePostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <Button variant="secondary" size="sm" disabled>
            Previous
          </Button>
          <span className="text-sm text-ink-soft">Page 1 of 5</span>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
