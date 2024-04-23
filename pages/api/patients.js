import { getPatients, createPatient } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const patients = await getPatients();
    res.status(200).json(patients);
  } else if (req.method === 'POST') {
    const patient = await createPatient(req.body);
    res.status(201).json(patient);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
