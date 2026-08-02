import React from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import StatusChip from "@/components/ui/StatusChip";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { mockStudents, mockRoadmaps, mockOffers } from "@/lib/mock-data";

export default function StudentDashboard() {
  const student = mockStudents[0];
  const roadmap = mockRoadmaps[0];
  const offers = mockOffers.filter((o) => o.studentId === student.id);

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      {/* Profile Completion */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-ink mb-2">Profile Completion</h3>
          <p className="text-sm text-ink-soft">{student.profileCompletion}% complete</p>
        </div>
        <div className="w-full bg-bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${student.profileCompletion}%` }}
          />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          {
            label: "Credits",
            value: student.creditsBalance.toLocaleString(),
            icon: "💰",
          },
          { label: "Roadmaps", value: student.roadmapCount, icon: "🗺️" },
          {
            label: "Offers Received",
            value: student.offersReceived,
            icon: "💼",
          },
          { label: "Skills", value: student.skills.length, icon: "⭐" },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-sm text-ink-soft mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-ink">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Current Roadmap */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-ink mb-1">
              {roadmap.title}
            </h3>
            <p className="text-sm text-ink-soft">
              {roadmap.completedSteps} of {roadmap.stepCount} steps completed
            </p>
          </div>
          <StatusChip status="Ready" color="ok" />
        </div>
        <div className="w-full bg-bg-muted rounded-full h-2 overflow-hidden mb-4">
          <div
            className="h-full bg-ok transition-all"
            style={{
              width: `${(roadmap.completedSteps / roadmap.stepCount) * 100}%`,
            }}
          />
        </div>
        <Button variant="ghost" size="md">
          Continue Learning →
        </Button>
      </Card>

      {/* Recent Offers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-ink">Recent Offers</h3>
          <a href="/student/offers" className="text-sm text-brand hover:text-brand-ink">
            View all →
          </a>
        </div>
        <div className="grid gap-4">
          {offers.slice(0, 3).map((offer) => (
            <Card key={offer.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar initials={offer.companyName[0]} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {offer.companyName}
                      </p>
                      <p className="text-xs text-ink-soft">{offer.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" size="sm">
                      {offer.amount.toLocaleString()} VND
                    </Badge>
                    <StatusChip
                      status={
                        offer.status.charAt(0).toUpperCase() +
                        offer.status.slice(1)
                      }
                      color={
                        offer.status === "accepted"
                          ? "ok"
                          : offer.status === "viewed"
                            ? "accent"
                            : "brand"
                      }
                    />
                    <span className="text-xs text-ink-soft">
                      Match: {(offer.matchScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="primary" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card interactive className="p-6 cursor-pointer">
          <h4 className="font-semibold text-ink mb-2">Start AI Consultation</h4>
          <p className="text-sm text-ink-soft mb-4">
            Get personalized guidance on your learning path
          </p>
          <Button variant="ghost" size="sm">
            Start Now →
          </Button>
        </Card>
        <Card interactive className="p-6 cursor-pointer">
          <h4 className="font-semibold text-ink mb-2">Publish on Marketplace</h4>
          <p className="text-sm text-ink-soft mb-4">
            Share your goals and get offers from companies
          </p>
          <Button variant="ghost" size="sm">
            Publish →
          </Button>
        </Card>
      </div>
    </div>
  );
}
