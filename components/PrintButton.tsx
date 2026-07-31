"use client";

// Screen-only helper for the printable flyer — the browser print dialog is also
// the "Save as PDF" path, so one button covers both.
export default function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button type="button" className="btn btn-primary" onClick={() => window.print()}>
      {label}
    </button>
  );
}
