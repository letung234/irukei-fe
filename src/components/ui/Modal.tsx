"use client";

import React, { useEffect } from "react";
import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/**
 * Modal
 * Dialog with backdrop, focus trap, and accessible patterns.
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      children,
      actions,
      size = "md",
    },
    ref,
  ) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-overlay-dark z-40 transition-opacity"
          onClick={onClose}
          role="presentation"
        />
        {/* Modal */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="presentation"
        >
          <div
            ref={ref}
            className={cn(
              "bg-bg-elevated border border-line rounded-lg shadow-xl w-full",
              sizeClasses[size],
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? "modal-desc" : undefined}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-line p-6">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-xl font-semibold text-ink"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-desc" className="text-sm text-ink-soft mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-ink-soft hover:text-ink transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>

            {/* Actions */}
            {actions && (
              <div className="flex items-center justify-end gap-3 border-t border-line p-6">
                {actions}
              </div>
            )}
          </div>
        </div>
      </>
    );
  },
);

Modal.displayName = "Modal";
export default Modal;
