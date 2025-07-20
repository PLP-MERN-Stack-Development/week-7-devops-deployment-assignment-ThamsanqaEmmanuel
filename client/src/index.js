import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "your-client-dsn",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
