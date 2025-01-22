import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:8080/api/v1/prescriptions";

const EditPrescription = () => {
    const { id } = useParams(); // Get the prescription ID from the URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        prescriptionDate: "",
        patientName: "",
        patientAge: "",
        patientGender: "",
        diagnosis: "",
        medicines: "",
        nextVisitDate: "",
    });

    const [errors, setErrors] = useState({}); // To track field-specific errors

    // Fetch the existing prescription details
    useEffect(() => {
        const fetchPrescription = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch prescription details");
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        };

        fetchPrescription();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error when user starts editing
        }));
    };

    // Validate fields
    const validateForm = () => {
        const newErrors = {};

        if (!formData.prescriptionDate) {
            newErrors.prescriptionDate = "Prescription date is required.";
        } else if (new Date(formData.prescriptionDate) > new Date()) {
            newErrors.prescriptionDate = "Prescription date cannot be in the future.";
        }

        if (!formData.patientName.trim()) {
            newErrors.patientName = "Patient name is required.";
        }

        if (!formData.patientAge) {
            newErrors.patientAge = "Patient age is required.";
        } else if (formData.patientAge < 0 || formData.patientAge > 120) {
            newErrors.patientAge = "Patient age must be between 0 and 120.";
        }

        if (!formData.patientGender) {
            newErrors.patientGender = "Patient gender is required.";
        }

        if (formData.nextVisitDate && formData.prescriptionDate) {
            const prescriptionDate = new Date(formData.prescriptionDate);
            const nextVisitDate = new Date(formData.nextVisitDate);

            if (nextVisitDate <= prescriptionDate) {
                newErrors.nextVisitDate =
                    "Next visit date must be after the prescription date.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update prescription");
            }

            Swal.fire("Success", "Prescription updated successfully", "success");
            navigate("/prescriptions");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-xl font-bold mb-4">Edit Prescription</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Prescription Date</label>
                    <input
                        type="date"
                        name="prescriptionDate"
                        value={formData.prescriptionDate}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.prescriptionDate ? "border-red-500" : ""
                            }`}
                        required
                    />
                    {errors.prescriptionDate && (
                        <p className="text-red-500 text-sm">{errors.prescriptionDate}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.patientName ? "border-red-500" : ""
                            }`}
                        required
                    />
                    {errors.patientName && (
                        <p className="text-red-500 text-sm">{errors.patientName}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">Patient Age</label>
                    <input
                        type="number"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.patientAge ? "border-red-500" : ""
                            }`}
                        required
                        min="0"
                        max="120"
                    />
                    {errors.patientAge && (
                        <p className="text-red-500 text-sm">{errors.patientAge}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">Patient Gender</label>
                    <select
                        name="patientGender"
                        value={formData.patientGender}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.patientGender ? "border-red-500" : ""
                            }`}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.patientGender && (
                        <p className="text-red-500 text-sm">{errors.patientGender}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">Diagnosis</label>
                    <textarea
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Medicines</label>
                    <textarea
                        name="medicines"
                        value={formData.medicines}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Next Visit Date</label>
                    <input
                        type="date"
                        name="nextVisitDate"
                        value={formData.nextVisitDate}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded ${errors.nextVisitDate ? "border-red-500" : ""
                            }`}
                    />
                    {errors.nextVisitDate && (
                        <p className="text-red-500 text-sm">{errors.nextVisitDate}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Prescription
                </button>
            </form>
        </div>
    );
};

export default EditPrescription;
