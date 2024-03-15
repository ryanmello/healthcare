import db from "@/lib/db";

export const getPatients = async () => {
  try {
    const patients = await db.patient.findMany();
    return patients;
  } catch (error) {
    return [];
  }
};