"use server";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_CREATE_CHATBOT_WEBHOOK_URL ??
  "http://localhost:5678/webhook";

const SECRET_KEY =
  process.env.WEBHOOK_SECRET_KEY ?? process.env.NEXT_PUBLIC_SECRET_KEY ?? "";

export async function createChatbotAction(formData: FormData) {
  if (!SECRET_KEY) {
    console.error("Missing webhook secret key configuration.");
    return { ok: false, status: 500, error: "Missing webhook secret key." };
  }

  const email = formData.get("email");
  const url = formData.get("url");
  const username = formData.get("username");
  const file = formData.get("file");

  if (
    typeof email !== "string" ||
    typeof url !== "string" ||
    typeof username !== "string"
  ) {
    return { ok: false, status: 400, error: "Invalid payload supplied." };
  }

  const outgoing = new FormData();
  outgoing.append("email", email);
  outgoing.append("url", url);
  outgoing.append("username", username);
  outgoing.append("secretKey", SECRET_KEY);

  if (file && file instanceof Blob) {
    const fileName =
      file instanceof File && file.name ? file.name : "attachment.pdf";
    outgoing.append("attachment", file, fileName);
  }

  try {
    const response = await fetch(`${WEBHOOK_URL}/create-chatbot`, {
      method: "POST",
      body: outgoing,
    });

    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error("Create chatbot webhook error", error);
    return { ok: false, status: 502, error: "Failed to reach webhook." };
  }
}
