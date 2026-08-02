import React from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import StatusChip from "@/components/ui/StatusChip";
import InlineAlert from "@/components/ui/InlineAlert";

export default function SystemHealthPage() {
  const metrics = [
    { label: "API Latency", value: "145ms", status: "ok" },
    { label: "Queue Workers", value: "8 active", status: "ok" },
    { label: "Redis Connection", value: "OK", status: "ok" },
    { label: "Failed Jobs (24h)", value: "2", status: "warning" },
  ];

  const services = [
    {
      name: "MongoDB",
      status: "healthy",
      latency: "2ms",
      checked: "2 min ago",
    },
    {
      name: "Redis Cache",
      status: "healthy",
      latency: "1ms",
      checked: "1 min ago",
    },
    {
      name: "Message Queue",
      status: "healthy",
      latency: "5ms",
      checked: "2 min ago",
    },
    {
      name: "Search Index",
      status: "healthy",
      latency: "45ms",
      checked: "2 min ago",
    },
    {
      name: "External APIs",
      status: "degraded",
      latency: "250ms",
      checked: "1 min ago",
    },
  ];

  const failedJobs = [
    {
      id: "job_001",
      name: "Image Processing",
      error: "OutOfMemory: Cannot allocate 2GB",
      timestamp: "2 hours ago",
    },
    {
      id: "job_002",
      name: "Email Digest",
      error: "SMTP Timeout",
      timestamp: "1 hour ago",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        title="System Health"
        description={`Last updated: ${new Date().toLocaleTimeString()}`}
      />

      {/* Alert */}
      <InlineAlert
        variant="warning"
        title="Degraded Performance"
        message="External API integration is experiencing higher than normal latency"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-xs text-ink-soft mb-2">{metric.label}</p>
            <p className="text-2xl font-bold text-ink mb-2">{metric.value}</p>
            <StatusChip
              status={metric.status === "ok" ? "Healthy" : "Warning"}
              color={metric.status === "ok" ? "ok" : "accent"}
            />
          </Card>
        ))}
      </div>

      {/* Services */}
      <Card className="p-6">
        <h3 className="font-semibold text-ink mb-4">Service Status</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-3 rounded-md hover:bg-bg-muted transition-colors border border-line"
            >
              <div className="flex-1">
                <p className="font-medium text-ink text-sm">{service.name}</p>
                <p className="text-xs text-ink-soft">
                  Latency: {service.latency} • Checked: {service.checked}
                </p>
              </div>
              <StatusChip
                status={
                  service.status === "healthy" ? "Healthy" : "Degraded"
                }
                color={service.status === "healthy" ? "ok" : "accent"}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Failed Jobs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-ink">
            Failed Jobs (24h)
          </h3>
          <Badge variant="danger" size="sm">2 Issues</Badge>
        </div>
        <div className="space-y-3">
          {failedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-md bg-danger-soft border border-danger-muted"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-medium text-danger-ink text-sm">
                  {job.name}
                </p>
                <span className="text-xs text-danger-ink">{job.timestamp}</span>
              </div>
              <p className="text-sm text-danger-ink mb-3 font-mono break-words">
                {job.error}
              </p>
              <button className="text-xs text-danger hover:text-danger-ink font-medium">
                ↻ Retry
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Cache Stats */}
      <Card className="p-6">
        <h3 className="font-semibold text-ink mb-4">Cache Statistics</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Hit Rate", value: "94.2%", trend: "↑" },
            { label: "Memory Used", value: "2.3 GB / 4 GB", trend: "→" },
            { label: "Evictions (24h)", value: "1,245", trend: "↓" },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-md bg-bg-muted">
              <p className="text-xs text-ink-soft mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-ink">
                {stat.value}
                <span className="ml-2 text-sm text-ink-soft">{stat.trend}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
