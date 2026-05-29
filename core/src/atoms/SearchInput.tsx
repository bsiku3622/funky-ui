import { forwardRef } from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";

/** A minimal search glyph so the system has zero icon deps. */
const SearchGlyph = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export interface SearchInputProps extends Omit<InputProps, "leading"> {
  onSearch?: (value: string) => void;
}

/** SearchInput — Input pre-wired with a search glyph + Enter-to-search. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, placeholder = "Search...", onKeyDown, ...rest }, ref) => {
    return (
      <Input
        ref={ref}
        type="search"
        placeholder={placeholder}
        leading={<SearchGlyph />}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) {
            onSearch((e.target as HTMLInputElement).value);
          }
          onKeyDown?.(e);
        }}
        {...rest}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";
