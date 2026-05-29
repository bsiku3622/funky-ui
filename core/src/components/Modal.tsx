import { useEffect } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** close when the backdrop is clicked (default true) */
  closeOnOverlay?: boolean;
  children?: ReactNode;
}

/** Modal root — overlay + centered brutalist panel. Closes on Esc. */
const ModalRoot = ({
  open,
  onClose,
  closeOnOverlay = true,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="funky-modal__overlay"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className="funky-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** called by the built-in close button (×) */
  onClose?: () => void;
  /** hide the × button */
  hideClose?: boolean;
  children?: ReactNode;
}
const ModalHeader = ({
  onClose,
  hideClose,
  className = "",
  children,
  ...rest
}: ModalHeaderProps) => (
  <div
    className={["funky-modal__header", className].filter(Boolean).join(" ")}
    {...rest}
  >
    <span>{children}</span>
    {!hideClose && onClose && (
      <button
        type="button"
        aria-label="Close"
        className="funky-modal__close"
        onClick={onClose}
      >
        ×
      </button>
    )}
  </div>
);

export interface ModalSlotProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
const ModalBody = ({ className = "", children, ...rest }: ModalSlotProps) => (
  <div
    className={["funky-modal__body", className].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </div>
);
const ModalFooter = ({ className = "", children, ...rest }: ModalSlotProps) => (
  <div
    className={["funky-modal__footer", className].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </div>
);

/** Modal — compound: Modal / .Header / .Body / .Footer */
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
