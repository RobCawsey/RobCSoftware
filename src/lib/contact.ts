import emailjs from '@emailjs/browser'

export type ContactPayload = {
  name: string
  email: string
  subject: string
  message: string
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error('EmailJS is not configured')
  }

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: payload.name,
      from_email: payload.email,
      subject: payload.subject,
      message: `From: ${payload.email}\n\n${payload.message}`,
    },
    { publicKey: PUBLIC_KEY }
  )
}
