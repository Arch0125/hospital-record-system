import { getPatientById, updatePatient, deletePatient } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const patient = await getPatientById(id);
      res.status(200).json(patient);
      break;
    case 'PUT':
      const updatedPatient = await updatePatient(id, req.body);
      res.status(200).json({ message: 'Patient updated successfully', affectedRows: updatedPatient });
      break;
    case 'DELETE':
      const deleted = await deletePatient(id);
      if (deleted) {
        res.status(200).json({ message: 'Patient deleted successfully' });
      } else {
        res.status(404).json({ message: 'Patient not found' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
