import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createPrescription } from '../services/prescriptionService';

const PrescriptionForm = () => {
    const [prescription, setPrescription] = useState({
        prescriptionDate: '',
        patientName: '',
        patientAge: '',
        patientGender: '',
        diagnosis: '',
        medicines: '',
        nextVisitDate: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save the prescription
            await createPrescription(prescription);

            // Success Alert
            Swal.fire({
                title: "Created!",
                icon: "success",
                draggable: true,
            });

            // Redirect after success
            navigate('/prescriptions');
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong while creating the prescription.",
                icon: "error"
            });
        }
    };

    const handleChange = (e) => {
        setPrescription({
            ...prescription,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Create Prescription</h2>
            <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="mb-4">
                    <label className="block">Prescription Date</label>
                    <input
                        type="date"
                        name="prescriptionDate"
                        value={prescription.prescriptionDate}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={prescription.patientName}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Patient Age</label>
                    <input
                        type="number"
                        name="patientAge"
                        value={prescription.patientAge}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Patient Gender</label>
                    <select
                        name="patientGender"
                        value={prescription.patientGender}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block">Diagnosis</label>
                    <textarea
                        name="diagnosis"
                        value={prescription.diagnosis}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block">Medicines</label>
                    <textarea
                        name="medicines"
                        value={prescription.medicines}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block">Next Visit Date</label>
                    <input
                        type="date"
                        name="nextVisitDate"
                        value={prescription.nextVisitDate}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Prescription
                </button>
            </form>
        </div>
    );
};

export default PrescriptionForm;
