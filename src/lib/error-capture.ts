// src/lib/error-capture.ts
let lastCapturedError: unknown = null;

if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    lastCapturedError = event.error;
  });
  window.addEventListener("unhandledrejection", (event) => {
    lastCapturedError = event.reason;
  });
}

export function consumeLastCapturedError() {
  const error = lastCapturedError;
  lastCapturedError = null;
  return error;
}
