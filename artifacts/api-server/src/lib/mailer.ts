import nodemailer from "nodemailer";
import { logger } from "./logger";

// ---------------------------------------------------------------------------
// Transporter — Gmail SMTP con App Password.
// Variables de entorno requeridas:
//   GMAIL_USER         → tu dirección Gmail que envía (ej: tuempresa@gmail.com)
//   GMAIL_APP_PASSWORD → contraseña de aplicación de 16 dígitos de Google
//   CONTACT_TO_EMAIL   → dirección que recibe los mensajes del formulario
// ---------------------------------------------------------------------------

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Faltan variables de entorno: GMAIL_USER y GMAIL_APP_PASSWORD son requeridas.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { type: "login", user, pass },
  });
}

// ---------------------------------------------------------------------------
// Plantilla HTML del email — diseño elegante para Reformas Petiso
// ---------------------------------------------------------------------------

function buildEmailHtml(data: {
  nombre: string;
  email: string;
  tipo: string;
  mensaje: string;
  fechaHora: string;
}): string {
  const tipoColor: Record<string, string> = {
    Cocina: "#b8860b",
    Baño: "#4a7c8e",
    Integral: "#6b5b95",
    Otro: "#555555",
  };
  const color = tipoColor[data.tipo] ?? "#555555";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva Solicitud — Reformas Petiso</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Cabecera -->
          <tr>
            <td style="background-color:#0a0f18;border-radius:12px 12px 0 0;padding:36px 48px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#9ca3af;">
                ESTUDIO DE REFORMAS
              </p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:1px;">
                Reformas Petiso
              </h1>
              <p style="margin:4px 0 0;font-size:12px;color:#6b7280;letter-spacing:2px;">
                VITORIA-GASTEIZ · BILBAO
              </p>
            </td>
          </tr>

          <!-- Franja de tipo de reforma -->
          <tr>
            <td style="background-color:${color};padding:12px 48px;">
              <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#ffffff;font-weight:600;">
                📋 &nbsp;Nueva Solicitud — ${data.tipo}
              </p>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 48px;">

              <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.6;">
                Has recibido una nueva solicitud de presupuesto a través del formulario de contacto de tu sitio web.
              </p>

              <!-- Datos del cliente -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;font-weight:600;">
                      DATOS DEL CLIENTE
                    </p>

                    <!-- Nombre -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <span style="font-size:18px;">👤</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                          <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#111827;">${escapeHtml(data.nombre)}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Email -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <span style="font-size:18px;">✉️</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Email</p>
                          <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#111827;">
                            <a href="mailto:${escapeHtml(data.email)}" style="color:${color};text-decoration:none;">
                              ${escapeHtml(data.email)}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Tipo de reforma -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td width="36" valign="top" style="padding-top:2px;">
                          <span style="font-size:18px;">🏠</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Tipo de Reforma</p>
                          <p style="margin:2px 0 0;">
                            <span style="display:inline-block;background-color:${color};color:#ffffff;font-size:13px;font-weight:600;padding:3px 12px;border-radius:20px;letter-spacing:1px;">
                              ${escapeHtml(data.tipo)}
                            </span>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Mensaje -->
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;font-weight:600;">
                MENSAJE DEL CLIENTE
              </p>
              <div style="background-color:#f9fafb;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:32px;">
                <p style="margin:0;font-size:15px;color:#374151;line-height:1.8;white-space:pre-wrap;">${escapeHtml(data.mensaje)}</p>
              </div>

              <!-- Botón responder -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re: Solicitud de presupuesto — ${encodeURIComponent(data.tipo)} | Reformas Petiso&body=Hola ${encodeURIComponent(data.nombre)},%0A%0AGracias por contactar con Reformas Petiso.%0A%0A"
                       style="display:inline-block;background-color:${color};color:#ffffff;font-size:14px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 40px;border-radius:8px;">
                      ✉️ &nbsp;Responder a ${escapeHtml(data.nombre)}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Pie -->
          <tr>
            <td style="background-color:#f9fafb;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;padding:24px 48px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Recibido el <strong>${data.fechaHora}</strong> a través del formulario de contacto de reformaspetiso.com
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#d1d5db;">
                Reformas Petiso · Vitoria-Gasteiz · Bilbao
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ---------------------------------------------------------------------------
// Función principal exportada
// ---------------------------------------------------------------------------

export interface ContactEmailData {
  nombre: string;
  email: string;
  tipo: string;
  mensaje: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    throw new Error("Falta la variable de entorno CONTACT_TO_EMAIL.");
  }

  const fechaHora = new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const asunto = `[Reformas Petiso] Nueva solicitud — ${data.tipo} | ${data.nombre}`;

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Reformas Petiso Web" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    replyTo: data.email,
    subject: asunto,
    html: buildEmailHtml({ ...data, fechaHora }),
    text: `Nueva solicitud de presupuesto\n\nNombre: ${data.nombre}\nEmail: ${data.email}\nTipo: ${data.tipo}\nFecha: ${fechaHora}\n\nMensaje:\n${data.mensaje}`,
  });

  logger.info({ to: toEmail, tipo: data.tipo }, "Email de contacto enviado correctamente");
}
