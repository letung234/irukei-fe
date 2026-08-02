import React from "react";
import StatusChip from "@/components/ui/StatusChip";
import { statusChipConfig } from "@/lib/mock-data";

export type MarketplacePostSnapshot = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  status: string;
  offersReceived: number;
  createdAt: Date;
  /** Public-facing city only — never email/phone/address */
  city?: string;
  studentDisplayName?: string;
};

/**
 * MarketplacePostCard — public snapshot only.
 * Contact and private fields intentionally omitted / replaced with privacy note.
 */
export function MarketplacePostCard({ post }: { post: MarketplacePostSnapshot }) {
  const status = statusChipConfig[post.status as keyof typeof statusChipConfig];
  const days = Math.max(
    0,
    Math.floor((Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <article className="rounded-lg border border-line bg-bg-elevated overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-line">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-ink line-clamp-2 flex-1">
            {post.title}
          </h3>
          <StatusChip
            status={status?.label ?? post.status}
            color={(status?.color as "ok" | "ink-soft" | "info") ?? "ink-soft"}
          />
        </div>
        <p className="text-sm text-ink-soft line-clamp-3 mb-3">
          {post.description}
        </p>
        <p className="text-xs text-ink-lighter">
          {post.studentDisplayName ?? "Student"}
          {post.city ? ` · ${post.city}` : ""}
          {" · contact hidden until offer accepted"}
        </p>
      </div>

      <div className="px-6 py-3 bg-bg-muted flex flex-wrap gap-2">
        {post.skills.map((skill) => (
          <span
            key={skill}
            className="inline-block px-2 py-1 bg-brand-soft text-brand-ink text-xs rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="p-6 flex items-center justify-between text-sm text-ink-soft">
        <span>{post.offersReceived} offers</span>
        <span>{days}d ago</span>
      </div>
    </article>
  );
}

export default MarketplacePostCard;
