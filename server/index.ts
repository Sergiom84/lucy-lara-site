import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Configuración de seguridad con Helmet (más permisiva para debugging)
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      connectSrc: ["'self'", "https://api.deepseek.com"],
      frameSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"]
    }
  } : false, // Disable CSP in development
  crossOriginEmbedderPolicy: false
}));

// Configuración CORS segura
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://centroesteticalucylara.com', 
      'https://www.centroesteticalucylara.com',
      'https://centroesteticalucylara.es',
      'https://www.centroesteticalucylara.es'
    ]
  : ['http://localhost:5000', 'http://localhost:5173', 'http://127.0.0.1:5000'];

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting global (configuración para pruebas)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // máximo 1000 requests por IP por ventana (aumentado para pruebas)
  message: {
    error: "Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting específico para formularios (configuración para pruebas)
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50, // máximo 50 envíos de formulario por IP (aumentado para pruebas)
  message: {
    error: "Has enviado demasiados formularios. Por favor, espera antes de intentar de nuevo."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting para chatbot (configuración para pruebas)
const chatbotLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100, // máximo 100 mensajes por minuto (aumentado para pruebas)
  message: {
    error: "Demasiados mensajes al chatbot. Por favor, espera un momento."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);
app.use('/api/booking', formLimiter);
app.use('/api/chatbot', chatbotLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
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

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    // Solo loguear el error, no volver a lanzarlo
    console.error(err);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT || 5000;
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
  
  server.listen(Number(port), host, () => {
    log(`serving on port ${port} (${host})`);
  });
})();
