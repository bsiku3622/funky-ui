import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type SyntheticEvent } from "react";

import { cx } from "../internal/cx";
import { CloseGlyph } from "../internal/glyphs";
import { accentClass } from "../styles/accent.css";
import { resolveAccent, type Accent } from "../tokens/vocabulary";
import { modal, modalBody, modalClose, modalCloseCorner, modalContent, modalFooter, modalHeader, modalSize, modalTitle } from "./Modal.css";

export interface ModalProps {
  open: boolean;
  /** Esc · 바깥 누름 · 닫기 버튼이 모두 이걸 부릅니다 */
  onClose: () => void;
  title?: ReactNode;
  /** 머리 막대의 색 (기본 보라) */
  accent?: Accent;
  size?: "sm" | "md" | "lg" | "xl";
  /** 아래 동작 줄 — 오른쪽 정렬 */
  footer?: ReactNode;
  /** 바깥(막)을 눌러 닫을지 (기본 true). 입력 중인 폼이면 false */
  dismissible?: boolean;
  closeLabel?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * 모달 — native `<dialog>` 의 `showModal()` 위에 섭니다. 포커스 가두기 · Esc · 뒤 화면 비활성 ·
 * 가장 위 층은 브라우저가 맡으므로 z-index 를 고르지 않습니다. 그림자는 시스템에서 유일한 8px 입니다.
 */
export function Modal({
  open,
  onClose,
  title,
  accent = "purple",
  size = "md",
  footer,
  dismissible = true,
  closeLabel = "닫기",
  className,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };
  // 막을 누르면 dialog 자신이 target 입니다 (내용은 안쪽 div 가 받습니다)
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (dismissible && e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={cx(modal, modalSize[size], accentClass[resolveAccent(accent)], className)}
      onCancel={onCancel}
      onClick={onBackdrop}
      aria-labelledby={title !== undefined ? titleId : undefined}
    >
      {open && (
        <div className={modalContent}>
          {title !== undefined ? (
            <div className={modalHeader}>
              <span id={titleId} className={modalTitle}>
                {title}
              </span>
              <button type="button" className={modalClose} onClick={onClose} aria-label={closeLabel}>
                <CloseGlyph size={18} />
              </button>
            </div>
          ) : (
            // 머리 막대가 없어도 닫는 길은 눈에 보여야 합니다 — Esc 와 막 누름만으로는 모자랍니다
            <button type="button" className={cx(modalClose, modalCloseCorner)} onClick={onClose} aria-label={closeLabel}>
              <CloseGlyph size={18} />
            </button>
          )}
          <div className={modalBody}>{children}</div>
          {footer && <div className={modalFooter}>{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
