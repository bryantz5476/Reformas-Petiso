import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Netlify Function: POST /api/contact
// Reemplaza el endpoint del api-server Express para el entorno Netlify.
// Variables de entorno necesarias (configurar en Netlify UI → Site variables):
//   GMAIL_USER          → tu dirección Gmail (quien envía)
//   GMAIL_APP_PASSWORD  → contraseña de aplicación de 16 dígitos de Google
//   CONTACT_TO_EMAIL    → dirección que recibe los mensajes
// ---------------------------------------------------------------------------

const TIPO_VALORES = ["Cocina", "Baño", "Integral", "Otro"] as const;
type TipoReforma = (typeof TIPO_VALORES)[number];

interface ContactData {
  nombre?: unknown;
  email?: unknown;
  tipo?: unknown;
  mensaje?: unknown;
  _honeypot?: unknown;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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
<head><meta charset="UTF-8"/><title>Nueva Solicitud — Reformas Petizo</title></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
      <tr><td style="background-color:#0a0f18;border-radius:12px 12px 0 0;padding:36px 48px;text-align:center;">
        <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#9ca3af;">ESTUDIO DE REFORMAS</p>
        <h1 style="margin:8px 0 0;font-size:28px;font-weight:700;color:#ffffff;">Reformas Petizo</h1>
        <p style="margin:4px 0 0;font-size:12px;color:#6b7280;letter-spacing:2px;">VITORIA-GASTEIZ · BILBAO</p>
      </td></tr>
      <tr><td style="background-color:${color};padding:12px 48px;">
        <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#ffffff;font-weight:600;">
          📋 &nbsp;Nueva Solicitud — ${escapeHtml(data.tipo)}
        </p>
      </td></tr>
      <tr><td style="background-color:#ffffff;padding:40px 48px;">
        <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.6;">
          Has recibido una nueva solicitud de presupuesto a través del formulario de tu sitio web.
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:28px;">
          <tr><td style="padding:24px 28px;">
            <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;font-weight:600;">DATOS DEL CLIENTE</p>
            <table width="100%" style="margin-top:16px;"><tr>
              <td width="36" valign="top" style="padding-top:2px;"><span style="font-size:18px;">👤</span></td>
              <td>
                <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                <p style="margin:2px 0 0;font-size:16px;font-weight:600;color:#111827;">${escapeHtml(data.nombre)}</p>
              </td>
            </tr></table>
            <table width="100%" style="margin-top:16px;"><tr>
              <td width="36" valign="top" style="padding-top:2px;"><span style="font-size:18px;">✉️</span></td>
              <td>
                <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Email</p>
                <p style="margin:2px 0 0;font-size:16px;font-weight:600;">
                  <a href="mailto:${escapeHtml(data.email)}" style="color:${color};text-decoration:none;">${escapeHtml(data.email)}</a>
                </p>
              </td>
            </tr></table>
            <table width="100%" style="margin-top:16px;"><tr>
              <td width="36" valign="top" style="padding-top:2px;"><span style="font-size:18px;">🏠</span></td>
              <td>
                <p style="margin:0;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Tipo de Reforma</p>
                <p style="margin:2px 0 0;">
                  <span style="display:inline-block;background-color:${color};color:#ffffff;font-size:13px;font-weight:600;padding:3px 12px;border-radius:20px;">
                    ${escapeHtml(data.tipo)}
                  </span>
                </p>
              </td>
            </tr></table>
          </td></tr>
        </table>
        <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;font-weight:600;">MENSAJE DEL CLIENTE</p>
        <div style="background-color:#f9fafb;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:20px 24px;margin-bottom:32px;">
          <p style="margin:0;font-size:15px;color:#374151;line-height:1.8;white-space:pre-wrap;">${escapeHtml(data.mensaje)}</p>
        </div>
        <table width="100%"><tr><td align="center">
          <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Solicitud%20${encodeURIComponent(data.tipo)}%20%7C%20Reformas%20Petizo&body=Hola%20${encodeURIComponent(data.nombre)}%2C%0A%0A"
             style="display:inline-block;background-color:${color};color:#ffffff;font-size:14px;font-weight:600;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:14px 40px;border-radius:8px;">
            ✉️ &nbsp;Responder a ${escapeHtml(data.nombre)}
          </a>
        </td></tr></table>
      </td></tr>
      <tr><td style="background-color:#f9fafb;border-radius:0 0 12px 12px;border-top:1px solid #e5e7eb;padding:24px 48px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#9ca3af;">
          Recibido el <strong>${data.fechaHora}</strong> · reformaspetiso.com
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function validate(data: ContactData): { valid: false; error: string } | {
  valid: true;
  nombre: string;
  email: string;
  tipo: TipoReforma;
  mensaje: string;
  _honeypot: string;
} {
  if (typeof data.nombre !== "string" || data.nombre.trim().length < 2 || data.nombre.length > 100)
    return { valid: false, error: "Nombre inválido" };
  if (typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    return { valid: false, error: "Email inválido" };
  if (typeof data.tipo !== "string" || !(TIPO_VALORES as readonly string[]).includes(data.tipo))
    return { valid: false, error: "Tipo de reforma inválido" };
  if (typeof data.mensaje !== "string" || data.mensaje.trim().length < 10 || data.mensaje.length > 2000)
    return { valid: false, error: "Mensaje inválido" };

  return {
    valid: true,
    nombre: data.nombre.trim(),
    email: data.email.trim(),
    tipo: data.tipo as TipoReforma,
    mensaje: data.mensaje.trim(),
    _honeypot: typeof data._honeypot === "string" ? data._honeypot : "",
  };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Método no permitido" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: ContactData;
  try {
    body = await req.json() as ContactData;
  } catch {
    return new Response(JSON.stringify({ message: "Cuerpo de la solicitud inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const validated = validate(body);
  if (!validated.valid) {
    return new Response(JSON.stringify({ message: "Los datos del formulario no son válidos." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { nombre, email, tipo, mensaje, _honeypot } = validated;

  // Honeypot: respuesta silenciosa si está relleno
  if (_honeypot.length > 0) {
    return new Response(JSON.stringify({ message: "Solicitud recibida." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!gmailUser || !gmailPass || !toEmail) {
    console.error("Faltan variables de entorno de email");
    return new Response(JSON.stringify({ message: "Error de configuración del servidor." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { type: "login", user: gmailUser, pass: gmailPass },
    });

    await transporter.sendMail({
      from: `"Reformas Petizo Web" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Reformas Petizo] Nueva solicitud — ${tipo} | ${nombre}`,
      html: buildEmailHtml({ nombre, email, tipo, mensaje, fechaHora }),
      text: `Nueva solicitud\n\nNombre: ${nombre}\nEmail: ${email}\nTipo: ${tipo}\nFecha: ${fechaHora}\n\nMensaje:\n${mensaje}`,
    });
  } catch (err) {
    console.error("Error enviando email:", err);
    return new Response(
      JSON.stringify({
        message: "No ha sido posible procesar tu solicitud. Por favor, inténtalo de nuevo o contáctanos directamente.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ message: "Solicitud recibida. Nos pondremos en contacto contigo a la brevedad." }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

export const config = { path: "/api/contact" };
