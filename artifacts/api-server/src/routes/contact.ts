import { Router, type IRouter, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { ContactRequest, ContactResponse } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { sendContactEmail } from "../lib/mailer";

const router: IRouter = Router();

// Rate limit específico para el formulario: 5 envíos / hora / IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Has enviado demasiadas solicitudes. Por favor, espera antes de intentarlo de nuevo." },
});

router.post("/contact", contactLimiter, async (req: Request, res: Response) => {
  const parsed = ContactRequest.safeParse(req.body);

  if (!parsed.success) {
    logger.warn({ issues: parsed.error.issues }, "Formulario de contacto: validación fallida");
    res.status(400).json(
      ContactResponse.parse({ message: "Los datos del formulario no son válidos." }),
    );
    return;
  }

  const { nombre, email, tipo, mensaje, _honeypot } = parsed.data;

  // Trampa honeypot: respuesta 200 silenciosa sin procesar nada
  if (_honeypot && _honeypot.length > 0) {
    logger.info({ email }, "Honeypot activado, descartando solicitud silenciosamente");
    res.status(200).json(
      ContactResponse.parse({ message: "Solicitud recibida. Nos pondremos en contacto contigo a la brevedad." }),
    );
    return;
  }

  try {
    await sendContactEmail({ nombre, email, tipo, mensaje });
  } catch (err) {
    logger.error({ err, email, tipo }, "Error al enviar email de contacto");
    res.status(500).json(
      ContactResponse.parse({
        message: "No ha sido posible procesar tu solicitud en este momento. Por favor, inténtalo de nuevo o llámanos directamente.",
      }),
    );
    return;
  }

  logger.info({ email, tipo }, "Solicitud de contacto procesada correctamente");

  res.status(200).json(
    ContactResponse.parse({
      message: "Solicitud recibida. Nos pondremos en contacto contigo a la brevedad.",
    }),
  );
});

export default router;
