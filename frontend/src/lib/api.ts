import type { ContactFormData } from "@/types";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzddzpep";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function submitContactForm(
  data: ContactFormData
): Promise<{ ok: boolean }> {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || "Échec de l'envoi du message",
      response.status
    );
  }

  return { ok: true };
}
