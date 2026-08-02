"use client";

import React, { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import InlineAlert from "@/components/ui/InlineAlert";
import { mockChildOrgs, mockRootOrg } from "@/lib/mock-data";

type Node = {
  id: string;
  name: string;
  type: string;
  children: Node[];
};

function buildTree(): Node {
  const byParent = new Map<string | null, typeof mockChildOrgs>();
  for (const org of mockChildOrgs) {
    const key = org.parentId;
    const list = byParent.get(key) ?? [];
    list.push(org);
    byParent.set(key, list);
  }

  const toNode = (id: string, name: string, type: string, parentKey: string | null): Node => {
    const kids = (byParent.get(id) ?? []).map((o) =>
      toNode(o.id, o.name, o.type, o.id),
    );
    return { id, name, type, children: kids };
  };

  return {
    id: mockRootOrg.id,
    name: mockRootOrg.name,
    type: "root",
    children: (byParent.get("org_root") ?? []).map((o) =>
      toNode(o.id, o.name, o.type, o.id),
    ),
  };
}

function TreeNode({
  node,
  depth = 0,
  selectedId,
  onSelect,
}: {
  node: Node;
  depth?: number;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={`w-full text-left rounded-md px-2 py-1.5 text-sm transition-colors ${
          selectedId === node.id
            ? "bg-brand-soft text-brand-ink font-medium"
            : "hover:bg-bg-hover text-ink"
        }`}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        <span className="font-mono text-[10px] text-ink-lighter mr-2">
          {node.type}
        </span>
        {node.name}
      </button>
      {node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default function OrgTreePage() {
  const tree = useMemo(() => buildTree(), []);
  const [selectedId, setSelectedId] = useState(mockChildOrgs[0]?.id ?? "");
  const [moveOpen, setMoveOpen] = useState(false);
  const selected =
    mockChildOrgs.find((o) => o.id === selectedId) ??
    (selectedId === mockRootOrg.id
      ? { id: mockRootOrg.id, name: mockRootOrg.name, type: "root" }
      : mockChildOrgs[0]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Organization tree"
        description="Hierarchy, selection, and move impact preview"
        primaryAction={
          <Button variant="secondary" size="md" onClick={() => setMoveOpen(true)}>
            Move node…
          </Button>
        }
      />

      <div className="grid lg:grid-cols-[1fr_20rem] gap-4">
        <Card className="p-4 min-h-[24rem]">
          <TreeNode
            node={tree}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </Card>
        <Card className="p-4 space-y-3">
          <h3 className="text-sm font-semibold text-ink">Detail</h3>
          <p className="text-sm text-ink">{selected?.name}</p>
          <p className="text-xs text-ink-soft">Type: {selected?.type}</p>
          <p className="text-xs text-ink-soft font-mono">{selected?.id}</p>
          <InlineAlert
            variant="info"
            title="Cache note"
            message="Moving a node will invalidate org membership permission cache keys for descendants."
          />
        </Card>
      </div>

      <Modal
        isOpen={moveOpen}
        onClose={() => setMoveOpen(false)}
        title="Move preview"
      >
        <div className="space-y-3 text-sm text-ink-soft">
          <p>
            Moving <strong className="text-ink">{selected?.name}</strong> affects
            child memberships and may rebuild permission matrix for{" "}
            <span className="font-mono text-xs">org:{selected?.id}:*</span>.
          </p>
          <p>This dialog is a static shell — no write API yet.</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setMoveOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" disabled>
              Confirm move
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
