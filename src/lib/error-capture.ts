let lastError: unknown = null;

if (typeof window === "undefined") {
  process.on("unhandledRejection", (error) => {
    lastError = error;
  });
  process.on("uncaughtException", (error) => {
    lastError = error;
  });
}

export function consumeLastCapturedError() {
  const error = lastError;
  lastError = null;
  return error;
}
