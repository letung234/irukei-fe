import React from "react";
import { cn } from "@/utils/cn";
import { jobStateInfo } from "@/lib/mock-data";
import Button from "@/components/ui/Button";

export type JobState = keyof typeof jobStateInfo;

/**
 * GenerationProgressPanel — async AI job progress (QUEUED → RUNNING → READY/FAILED).
 */
export function GenerationProgressPanel({
  state,
  title = "AI roadmap generation",
  onRetry,
}: {
  state: JobState;
  title?: string;
  onRetry?: () => void;
}) {
  const info = jobStateInfo[state];
  const steps: JobState[] = ["queued", "running", "ready"];
  const activeIndex =
    state === "failed" ? 1 : Math.max(0, steps.indexOf(state === "ready" ? "ready" : state));

  return (
    <div className="rounded-lg border border-line bg-bg-elevated p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">{title}</h3>
          <p className="text-sm text-ink-soft mt-1">{info.description}</p>
        </div>
        <span
          className={cn(
            "text-xs font-medium px-2 py-1 rounded-md",
            info.color === "ok" && "bg-ok-soft text-ok-ink",
            info.color === "danger" && "bg-danger-soft text-danger-ink",
            info.color === "info" && "bg-info-soft text-info-ink",
          )}
        >
          {info.label}
        </span>
      </div>

      <ol className="flex gap-2">
        {steps.map((step, i) => {
          const done =
            state === "ready" ||
            (state !== "failed" && i < activeIndex) ||
            (state === "running" && i === 0);
          const current =
            (state === "queued" && i === 0) ||
            (state === "running" && i === 1) ||
            (state === "ready" && i === 2);
          return (
            <li
              key={step}
              className={cn(
                "flex-1 h-1.5 rounded-full",
                done || current ? "bg-brand" : "bg-bg-muted",
                state === "failed" && i === 1 && "bg-danger",
              )}
            />
          );
        })}
      </ol>

      {state === "failed" && (
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-sm text-danger">Generation failed. You can retry — credits are not deducted until READY.</p>
          {onRetry && (
            <Button size="sm" variant="secondary" onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default GenerationProgressPanel;
