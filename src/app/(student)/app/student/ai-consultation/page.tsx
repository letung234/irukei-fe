"use client";

import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Label from "@/components/ui/Label";
import { GenerationProgressPanel } from "@/components/domain/GenerationProgressPanel";
import { CreditCostBadge } from "@/components/domain/CreditCostBadge";

const STEPS = ["Goals", "Background", "Constraints", "Review"];

export default function AiConsultationPage() {
  const [step, setStep] = useState(0);
  const [jobState, setJobState] = useState<
    "queued" | "running" | "ready" | "failed"
  >("queued");
  const [autosave] = useState("Saved 2s ago");

  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="AI consultation"
        description="Build a personal roadmap in guided steps"
        primaryAction={
          <div className="flex items-center gap-3">
            <CreditCostBadge cost={12} />
            <Button
              variant="primary"
              size="md"
              onClick={() => setJobState("running")}
            >
              Generate roadmap
            </Button>
          </div>
        }
        secondaryActions={
          <span className="text-xs text-ink-soft px-2 py-1 rounded-md bg-bg-muted">
            {autosave}
          </span>
        }
      />

      <ol className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                i === step
                  ? "bg-brand text-white"
                  : i < step
                    ? "bg-brand-soft text-brand-ink"
                    : "bg-bg-muted text-ink-soft"
              }`}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-[1fr_18rem] gap-6">
        <Card className="p-6 space-y-4">
          {step === 0 && (
            <>
              <div>
                <Label htmlFor="goal">Primary learning goal</Label>
                <Input
                  id="goal"
                  placeholder="e.g. Frontend Junior within 6 months"
                  defaultValue="Frontend Junior"
                />
              </div>
              <div>
                <Label htmlFor="target">Target outcome</Label>
                <Textarea
                  id="target"
                  rows={4}
                  placeholder="What does success look like?"
                  defaultValue="Ship a React portfolio and pass screening interviews."
                />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div>
                <Label htmlFor="skills">Current skills</Label>
                <Input
                  id="skills"
                  defaultValue="JavaScript, React basics"
                />
              </div>
              <div>
                <Label htmlFor="hours">Weekly hours</Label>
                <Input id="hours" type="number" defaultValue={10} />
              </div>
            </>
          )}
          {step >= 2 && (
            <p className="text-sm text-ink-soft">
              Later steps (constraints & review) wire to full form sections in product
              implementation — skeleton chrome only for shell preview.
            </p>
          )}
          <div className="flex justify-between pt-2">
            <Button
              variant="ghost"
              size="md"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            <Button
              variant="secondary"
              size="md"
              disabled={step >= STEPS.length - 1}
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              Continue
            </Button>
          </div>
        </Card>

        <aside className="space-y-4">
          <GenerationProgressPanel
            state={jobState}
            onRetry={() => setJobState("queued")}
          />
          <Card className="p-4 text-sm text-ink-soft">
            Tip: high-risk spend actions wait for server confirm — no optimistic debit.
          </Card>
        </aside>
      </div>
    </div>
  );
}
