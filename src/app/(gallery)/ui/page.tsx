"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Radio from "@/components/ui/Radio";
import Switch from "@/components/ui/Switch";
import Badge from "@/components/ui/Badge";
import StatusChip from "@/components/ui/StatusChip";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import IconButton from "@/components/ui/IconButton";
import Modal from "@/components/ui/Modal";
import InlineAlert from "@/components/ui/InlineAlert";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import Tabs from "@/components/ui/Tabs";
import Divider from "@/components/ui/Divider";
import Label from "@/components/ui/Label";

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("option1");
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-ink mb-2">Irukei Design System</h1>
          <p className="text-ink-soft">Component gallery and design tokens</p>
        </div>

        {/* Color Tokens */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink mb-6">Design Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { name: "--bg", color: "bg-bg" },
              { name: "--bg-elevated", color: "bg-bg-elevated" },
              { name: "--brand", color: "bg-brand" },
              { name: "--accent", color: "bg-accent" },
              { name: "--ok", color: "bg-ok" },
              { name: "--danger", color: "bg-danger" },
              { name: "--info", color: "bg-info" },
              { name: "--line", color: "bg-line" },
            ].map((token) => (
              <div key={token.name}>
                <div className={`${token.color} h-24 rounded-lg border border-line mb-2`} />
                <p className="text-xs font-mono text-ink-soft">{token.name}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider label="Components" className="my-12" />

        {/* Buttons */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Buttons</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink-soft mb-3">Variants</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-soft mb-3">Sizes</p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-soft mb-3">States</p>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Inputs */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Form Inputs</h3>
          <div className="space-y-6 max-w-md">
            <Input
              label="Text Input"
              placeholder="Enter text..."
              hint="This is a helpful hint"
            />
            <Input
              label="With Error"
              error="This field is required"
              defaultValue="Invalid"
            />
            <Textarea
              label="Textarea"
              placeholder="Enter longer text..."
              hint="Multi-line input"
            />
            <div>
              <Checkbox
                label="Remember me"
                description="Keep me logged in"
                checked={checkedCheckbox}
                onChange={(e) => setCheckedCheckbox(e.target.checked)}
              />
            </div>
            <div>
              <p className="text-sm text-ink-soft mb-3">Radio Options</p>
              <div className="space-y-2">
                <Radio
                  name="demo"
                  label="Option 1"
                  value="option1"
                  checked={selectedRadio === "option1"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <Radio
                  name="demo"
                  label="Option 2"
                  value="option2"
                  checked={selectedRadio === "option2"}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Switch
                label="Enable notifications"
                checked={switchValue}
                onChange={(e) => setSwitchValue(e.target.checked)}
              />
            </div>
          </div>
        </section>

        {/* Badges & Status */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Badges & Status</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-ink-soft mb-3">Badge Variants</p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-ink-soft mb-3">Status Chips</p>
              <div className="flex flex-wrap gap-3">
                <StatusChip status="Published" color="ok" />
                <StatusChip status="Draft" color="ink-soft" />
                <StatusChip status="Running" color="info" />
                <StatusChip status="Failed" color="danger" />
                <StatusChip status="Queued" color="brand" />
              </div>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Avatars</h3>
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xs" initials="AB" />
              <span className="text-xs text-ink-soft">XS</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="sm" initials="CD" />
              <span className="text-xs text-ink-soft">SM</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="md" initials="EF" />
              <span className="text-xs text-ink-soft">MD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" initials="GH" />
              <span className="text-xs text-ink-soft">LG</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="xl" initials="IJ" />
              <span className="text-xs text-ink-soft">XL</span>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Cards</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <Card className="p-6">
              <h4 className="font-semibold text-ink mb-2">Default Card</h4>
              <p className="text-sm text-ink-soft">
                Cards are containers with subtle shadows and borders.
              </p>
            </Card>
            <Card interactive className="p-6 cursor-pointer">
              <h4 className="font-semibold text-ink mb-2">Interactive Card</h4>
              <p className="text-sm text-ink-soft">
                Hover to see the interactive state with shadow elevation.
              </p>
            </Card>
          </div>
        </section>

        {/* Alerts */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Inline Alerts</h3>
          <div className="space-y-4 max-w-2xl">
            <InlineAlert
              variant="info"
              title="Info"
              message="This is an informational message"
            />
            <InlineAlert
              variant="success"
              title="Success"
              message="Operation completed successfully"
            />
            <InlineAlert
              variant="warning"
              title="Warning"
              message="Please review this before proceeding"
            />
            <InlineAlert
              variant="danger"
              title="Error"
              message="Something went wrong. Please try again"
            />
          </div>
        </section>

        {/* Modal */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Modal</h3>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Modal Example"
            description="This demonstrates the Modal component"
            actions={
              <>
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p className="text-sm text-ink-soft">
              Modals trap focus and display over a backdrop. They're perfect for
              confirmations and important decisions.
            </p>
          </Modal>
        </section>

        {/* Spinners */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Spinners</h3>
          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" className="text-brand" />
              <span className="text-xs text-ink-soft">SM</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-brand" />
              <span className="text-xs text-ink-soft">MD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" className="text-brand" />
              <span className="text-xs text-ink-soft">LG</span>
            </div>
          </div>
        </section>

        {/* Empty State */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Empty State</h3>
          <EmptyState
            icon="📭"
            title="No items found"
            description="Try adjusting your filters or search terms"
            action={<Button variant="primary">Create New</Button>}
          />
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Tabs</h3>
          <Tabs
            tabs={[
              {
                id: "tab1",
                label: "Tab One",
                content: (
                  <p className="text-sm text-ink-soft">
                    Content for the first tab goes here.
                  </p>
                ),
              },
              {
                id: "tab2",
                label: "Tab Two",
                content: (
                  <p className="text-sm text-ink-soft">
                    Content for the second tab goes here.
                  </p>
                ),
              },
              {
                id: "tab3",
                label: "Tab Three",
                content: (
                  <p className="text-sm text-ink-soft">
                    Content for the third tab goes here.
                  </p>
                ),
              },
            ]}
          />
        </section>

        {/* Icon Button */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-ink mb-6">Icon Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <IconButton
              variant="primary"
              ariaLabel="Edit"
              icon={<span>✏️</span>}
            />
            <IconButton
              variant="secondary"
              ariaLabel="Delete"
              icon={<span>🗑️</span>}
            />
            <IconButton
              variant="ghost"
              ariaLabel="Settings"
              icon={<span>⚙️</span>}
            />
            <IconButton
              variant="danger"
              ariaLabel="Close"
              icon={<span>✕</span>}
            />
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-line text-center text-sm text-ink-soft">
          <p>Irukei Design System © 2024</p>
        </div>
      </div>
    </div>
  );
}
