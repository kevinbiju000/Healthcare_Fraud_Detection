import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Patient_details.css'; // Use the same CSS file as the login page

function PatientDetailsPage() {
  const [patientID, setPatientID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [treatmentCost, setTreatmentCost] = useState('');
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');
  const [claimAmount, setClaimAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/patient-details', {
        Patient_ID: patientID,
        Name: patientName,
        Age: age,
        Gender: gender,
        Address: address,
        Diagnosis: diagnosis,
        Treatment_Date: treatmentDate,
        Treatment_Cost: treatmentCost,
        Insurance_Company: insuranceCompany,
        Insurance_Policy_Number: insurancePolicyNumber,
        Claim_Amount: claimAmount,
      });
      setMessage(response.data.message);
      if (response.data.success) {
        navigate('/dashboard'); // Navigate back to the dashboard or any other page
      }
    } catch (error) {
      setMessage('Error submitting details: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h1>Patient Details</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            placeholder="Patient ID"
            required
          />
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
          <input
            type="text"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Diagnosis"
            required
          />
          <input
            type="date"
            value={treatmentDate}
            onChange={(e) => setTreatmentDate(e.target.value)}
            required
          />
          <input
            type="number"
            value={treatmentCost}
            onChange={(e) => setTreatmentCost(e.target.value)}
            placeholder="Treatment Cost"
            required
          />
          <input
            type="text"
            value={insuranceCompany}
            onChange={(e) => setInsuranceCompany(e.target.value)}
            placeholder="Insurance Company"
            required
          />
          <input
            type="text"
            value={insurancePolicyNumber}
            onChange={(e) => setInsurancePolicyNumber(e.target.value)}
            placeholder="Insurance Policy Number"
            required
          />
          <input
            type="number"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
            placeholder="Claim Amount"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default PatientDetailsPage;
