import React from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StatusChip from "@/components/ui/StatusChip";
import { CreditCostBadge } from "@/components/domain/CreditCostBadge";
import { mockOffers } from "@/lib/mock-data";

const COLUMNS = [
  { key: "draft", label: "Draft" },
  { key: "sent", label: "Sent" },
  { key: "viewed", label: "Viewed" },
  { key: "accepted", label: "Accepted" },
  { key: "rejected", label: "Rejected" },
] as const;

export default function CompanyOffersKanbanPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Offers board"
        description="Visual pipeline by status — drag-and-drop optional later"
        primaryAction={
          <div className="flex items-center gap-2">
            <CreditCostBadge cost={8} />
            <Button variant="primary" size="md">
              New offer
            </Button>
          </div>
        }
      />

      <div className="flex gap-3 overflow-x-auto pb-2">
        {COLUMNS.map((col) => {
          const cards = mockOffers.filter((o) => o.status === col.key);
          return (
            <div
              key={col.key}
              className="min-w-[16rem] w-64 flex-shrink-0 rounded-lg border border-line bg-bg-muted/60 p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {col.label}
                </h3>
                <span className="text-xs text-ink-lighter">{cards.length}</span>
              </div>
              <div className="space-y-2 min-h-[12rem]">
                {cards.length === 0 && (
                  <p className="text-xs text-ink-lighter px-1 py-6 text-center">
                    No cards
                  </p>
                )}
                {cards.map((offer) => (
                  <Card key={offer.id} className="p-3 space-y-2">
                    <p className="text-sm font-medium text-ink line-clamp-2">
                      {offer.title}
                    </p>
                    <p className="text-xs text-ink-soft">{offer.studentName}</p>
                    <div className="flex items-center justify-between">
                      <StatusChip
                        status={col.label}
                        color={
                          col.key === "accepted"
                            ? "ok"
                            : col.key === "rejected"
                              ? "danger"
                              : "brand"
                        }
                      />
                      <span className="text-[11px] text-ink-lighter">
                        {(offer.matchScore * 100).toFixed(0)}% match
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
