import React from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import StatusChip from "@/components/ui/StatusChip";
import { mockCompanies, mockOffers } from "@/lib/mock-data";

export default function CompanyDashboard() {
  const company = mockCompanies[0];
  const companyOffers = mockOffers.filter((o) => o.companyId === company.id);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <PageHeader title="Dashboard" description={company.name} />

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Leads", value: company.leadsCount },
          { label: "Offers sent", value: company.offersCount },
          { label: "Active trials", value: 3 },
          { label: "Credits spent (30d)", value: "128" },
        ].map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-xs text-ink-soft mb-1">{metric.label}</p>
            <p className="text-lg font-bold text-ink">{metric.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent Offers Sent */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-ink">Recent Offers Sent</h3>
          <a href="/app/company/offers" className="text-xs text-brand">
            View all
          </a>
        </div>
        <div className="space-y-3">
          {companyOffers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="flex items-center justify-between pb-3 border-b border-line last:border-0"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar initials={offer.studentName[0]} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">
                    {offer.studentName}
                  </p>
                  <p className="text-xs text-ink-soft truncate">
                    {offer.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StatusChip
                  status={
                    offer.status.charAt(0).toUpperCase() + offer.status.slice(1)
                  }
                  color={
                    offer.status === "accepted"
                      ? "ok"
                      : offer.status === "viewed"
                        ? "accent"
                        : "brand"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card interactive className="p-6 cursor-pointer">
          <h4 className="font-semibold text-ink mb-2">Create New Offer</h4>
          <p className="text-xs text-ink-soft mb-4">
            Post an offer to talented students
          </p>
          <Button variant="ghost" size="sm">
            Create →
          </Button>
        </Card>
        <Card interactive className="p-6 cursor-pointer">
          <h4 className="font-semibold text-ink mb-2">Browse Marketplace</h4>
          <p className="text-xs text-ink-soft mb-4">
            Find and connect with students
          </p>
          <Button variant="ghost" size="sm">
            Browse →
          </Button>
        </Card>
      </div>
    </div>
  );
}
