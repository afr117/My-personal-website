import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";

// --- Fix for Node ESM dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Diagnostic startup logging ---
console.log("🟢 Starting PortfolioForge backend...");

const app = express();

// --- Session configuration ---
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      "fallback-secret-please-set-SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// --- Middleware setup ---
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// --- Serve attached_assets directory (uploads, generated images) ---
const assetsPath = path.resolve(__dirname, "..", "attached_assets");
app.use("/attached_assets", express.static(assetsPath));

// --- Request logging middleware ---
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// --- Catch async errors globally ---
process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Promise Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

(async () => {
  console.log("🧩 Entered async startup");
  try {
    const server = await registerRoutes(app);
    console.log("✅ Routes registered");

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("💥 Route error:", err);
      res.status(status).json({ message });
    });

    // Vite setup or static serving
    if (app.get("env") === "development") {
      console.log("⚙️ Setting up Vite dev server...");
      await setupVite(app, server);
      console.log("✅ Vite dev server ready");
    } else {
      console.log("📦 Serving static production build...");
      serveStatic(app);
      console.log("✅ Static serving enabled");
    }

    // Start listening
    const port = parseInt(process.env.PORT || "5000", 10);
    console.log("⚙️ Preparing to listen on port", port);

    server.listen(port, "0.0.0.0", () => {
      console.log(`🚀 PortfolioForge running at http://localhost:${port}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (err) {
    console.error("💥 Startup failed:", err);
  }
})();
