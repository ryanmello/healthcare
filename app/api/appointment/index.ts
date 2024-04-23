import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';

// Adjust this to match the exported 'db' client from your setup
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch appointments and include patient data
      const appointments = await db.appointment.findMany({
        where: { archived: false },
        include: { patient: true },
      });
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
