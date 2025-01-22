import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createPrescription } from '../services/prescriptionService';

const PrescriptionForm = () => {
    const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    const [prescription, setPrescription] = useState({
        prescriptionDate: today,
        patientName: '',
        patientAge: '',
        patientGender: '',
        diagnosis: '',
        medicines: '',
        nextVisitDate: '',
    });

    const [errors, setErrors] = useState({}); // Validation errors
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Prescription Date validation
        if (!prescription.prescriptionDate) {
            newErrors.prescriptionDate = 'Prescription Date is required.';
        }

        // Patient Name validation
        if (!prescription.patientName) {
            newErrors.patientName = 'Patient Name is required.';
        }

        // Patient Age validation
        if (!prescription.patientAge || isNaN(prescription.patientAge)) {
            newErrors.patientAge = 'Patient Age is required and must be a valid number.';
        } else if (prescription.patientAge < 0 || prescription.patientAge > 120) {
            newErrors.patientAge = 'Patient Age must be between 0 and 120.';
        }

        // Patient Gender validation
        if (!prescription.patientGender) {
            newErrors.patientGender = 'Patient Gender is required.';
        }

        // Next Visit Date validation
        if (prescription.nextVisitDate) {
            const prescriptionDate = new Date(prescription.prescriptionDate);
            const nextVisitDate = new Date(prescription.nextVisitDate);
            if (nextVisitDate <= prescriptionDate) {
                newErrors.nextVisitDate = 'Next Visit Date must be after the Prescription Date.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Validate before submitting

        try {
            await createPrescription(prescription);

            Swal.fire({
                title: 'Created!',
                text: 'Prescription created successfully.',
                icon: 'success',
            });

            navigate('/prescriptions'); // Redirect on success
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while creating the prescription.',
                icon: 'error',
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
                {/* Prescription Date */}
                <div className="mb-4">
                    <label className="block">Prescription Date</label>
                    <input
                        type="date"
                        name="prescriptionDate"
                        value={prescription.prescriptionDate}
                        onChange={handleChange}
                        className={`p-2 border rounded w-full ${errors.prescriptionDate ? 'border-red-500' : ''
                            }`}
                        required
                    />
                    {errors.prescriptionDate && (
                        <span className="text-red-500">{errors.prescriptionDate}</span>
                    )}
                </div>

                {/* Patient Name */}
                <div className="mb-4">
                    <label className="block">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={prescription.patientName}
                        onChange={handleChange}
                        className={`p-2 border rounded w-full ${errors.patientName ? 'border-red-500' : ''
                            }`}
                        required
                    />
                    {errors.patientName && (
                        <span className="text-red-500">{errors.patientName}</span>
                    )}
                </div>

                {/* Patient Age */}
                <div className="mb-4">
                    <label className="block">Patient Age</label>
                    <input
                        type="number"
                        name="patientAge"
                        value={prescription.patientAge}
                        onChange={handleChange}
                        className={`p-2 border rounded w-full ${errors.patientAge ? 'border-red-500' : ''
                            }`}
                        required
                    />
                    {errors.patientAge && (
                        <span className="text-red-500">{errors.patientAge}</span>
                    )}
                </div>

                {/* Patient Gender */}
                <div className="mb-4">
                    <label className="block">Patient Gender</label>
                    <select
                        name="patientGender"
                        value={prescription.patientGender}
                        onChange={handleChange}
                        className={`p-2 border rounded w-full ${errors.patientGender ? 'border-red-500' : ''
                            }`}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.patientGender && (
                        <span className="text-red-500">{errors.patientGender}</span>
                    )}
                </div>

                {/* Diagnosis */}
                <div className="mb-4">
                    <label className="block">Diagnosis</label>
                    <textarea
                        name="diagnosis"
                        value={prescription.diagnosis}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    ></textarea>
                </div>

                {/* Medicines */}
                <div className="mb-4">
                    <label className="block">Medicines</label>
                    <textarea
                        name="medicines"
                        value={prescription.medicines}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                    ></textarea>
                </div>

                {/* Next Visit Date */}
                <div className="mb-4">
                    <label className="block">Next Visit Date</label>
                    <input
                        type="date"
                        name="nextVisitDate"
                        value={prescription.nextVisitDate}
                        onChange={handleChange}
                        className={`p-2 border rounded w-full ${errors.nextVisitDate ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.nextVisitDate && (
                        <span className="text-red-500">{errors.nextVisitDate}</span>
                    )}
                </div>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Create Prescription
                </button>
            </form>
        </div>
    );
};

export default PrescriptionForm;
