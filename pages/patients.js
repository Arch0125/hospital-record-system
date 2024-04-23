import { useState, useEffect } from 'react';
import PatientForm from './form';

export default function Home() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    const res = await fetch('/api/patients');
    const data = await res.json();
    setPatients(data);
    setLoading(false);
  }

  return (
    <div className="p-4 bg-blue-200">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Hospital Record Management</h1>
      <button onClick={() => fetchPatients()} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Loading...' : 'Refresh Patients'}
      </button>
      <div className="mt-4">
        {patients.map((patient) => (
          <div key={patient.id} className="border p-4 my-2 bg-blue-100">
            <p className="text-blue-800">
              {patient.name} - {patient.age} - {patient.diagnosis}
              <button onClick={() => handleDelete(patient.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
              <PatientForm patientData={patient} formType="update" />
            </p>
          </div>
        ))}
      </div>
      <PatientForm formType="create" />
    </div>
  );
}

async function handleDelete(id) {
  const res = await fetch(`/api/patients/${id}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    alert('Patient deleted successfully');
    window.location.reload();
  } else {
    alert('Failed to delete patient');
  }
}
