import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

const isProduction = process.env.NODE_ENV === "production";

// ---------------------------------------------------------------------------
// Helmet — cabeceras HTTP defensivas.
// CSP ajustada para este proyecto: permite Google Fonts y assets propios.
// ---------------------------------------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    hidePoweredBy: true,
    noSniff: true,
    frameguard: { action: "sameorigin" },
    xssFilter: false,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  }),
);

// ---------------------------------------------------------------------------
// CORS — en producción solo orígenes en ALLOWED_ORIGINS; libre en dev.
// Nota: en producción con proxy añadir app.set('trust proxy', 1).
// ---------------------------------------------------------------------------
const corsOptions: cors.CorsOptions = isProduction
  ? {
      origin: (origin, callback) => {
        const allowed = (process.env.ALLOWED_ORIGINS ?? "")
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean);
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
          return;
        }
        logger.warn({ origin }, "CORS: origin rechazado");
        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Accept"],
    }
  : { origin: true, credentials: true };

app.use(cors(corsOptions));

// ---------------------------------------------------------------------------
// Rate limit global: 100 req / 15 min por IP. Desactivado en dev.
// ---------------------------------------------------------------------------
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiadas solicitudes. Por favor, inténtalo más tarde." },
  skip: () => !isProduction,
});

app.use(globalLimiter);

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// Body parsing con límite explícito (anti-DoS)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/api", router);

export default app;
