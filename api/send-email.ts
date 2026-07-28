import type { VercelRequest, VercelResponse } from '@vercel/node';
import emailjs from '@emailjs/browser';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, phone, subject, message } = req.body;

  await emailjs.send(
    process.env.EMAILJS_SERVICE_ID!,
    process.env.EMAILJS_TEMPLATE_ID!,
    { from_name: name, from_email: email, phone, subject: subject || "Portfolio Contact", message, to_email: "tobilobajagun@gmail.com" },
    { publicKey: process.env.EMAILJS_PUBLIC_KEY! }
  );
  res.status(200).json({ ok: true });
}
