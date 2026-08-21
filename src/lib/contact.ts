export type ContactPayload = {
  name: string
  email: string
  message: string
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Request failed')
  }
}
