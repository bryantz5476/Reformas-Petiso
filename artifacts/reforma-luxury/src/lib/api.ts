export type TipoReforma = "Cocina" | "Baño" | "Integral" | "Otro";

export interface ContactRequest {
  nombre: string;
  email: string;
  tipo: TipoReforma;
  mensaje: string;
  _honeypot?: string;
}

export interface ContactResponse {
  message: string;
}

export async function submitContact(data: ContactRequest): Promise<ContactResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  return response.json() as Promise<ContactResponse>;
}
