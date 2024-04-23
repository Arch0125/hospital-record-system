import { useState } from "react";

export default function PatientForm({ patientData, formType }) {
    const [formData, setFormData] = useState({
      name: patientData?.name || '',
      age: patientData?.age || '',
      diagnosis: patientData?.diagnosis || '',
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = formType === 'create' ? '/api/patients' : `/api/patients/${1}`;
      const method = formType === 'create' ? 'POST' : 'PUT';
  
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        alert(`Patient ${formType === 'create' ? 'added' : 'updated'} successfully`);
        window.location.href = '/';
      } else {
        alert('Failed to submit patient');
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
  
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
  
        <label>Diagnosis:</label>
        <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
  
        <button type="submit">{formType === 'create' ? 'Add Patient' : 'Update Patient'}</button>
      </form>
    );
  }
  
