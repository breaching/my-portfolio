import type { ContactFormData } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ContactResponse {
  id: number;
  message: string;
}

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
): Promise<ContactResponse> {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.detail || "Échec de l'envoi du message",
      response.status,
      errorData.code
    );
  }

  return response.json();
}
