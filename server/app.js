const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const Sentry = require("@sentry/node");


app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

Sentry.init({ dsn: "your-server-dsn" });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
