import { EmailTemplate } from '../../../components/email/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Healthcare <melloyellow12@icloud.com>',
      to: ['ryanmello897@gmail.com'],
      subject: 'Hello world',
      react: '<h1>HELLO EMAIL</h1>',
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
