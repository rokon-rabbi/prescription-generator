import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost:8080/api/v1/prescriptions";

const EditPrescription = () => {
    const { id } = useParams(); // Get the prescription ID from the URL
    console.log(id)
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

    const [error, setError] = useState("");

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
                setError(error.message);
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
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
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
            Swal.fire({
                title: "Do you want to update the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Update",
                denyButtonText: `Don't update`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire("Updated!", "", "success");
                    navigate("/prescriptions");
                } else if (result.isDenied) {
                    Swal.fire("Changes are not updated", "", "info");
                }
            });
            // Redirect to the list of prescriptions
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-xl font-bold mb-4">Edit Prescription</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Prescription Date</label>
                    <input
                        type="date"
                        name="prescriptionDate"
                        value={formData.prescriptionDate}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Patient Age</label>
                    <input
                        type="number"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        min="0"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Patient Gender</label>
                    <select
                        name="patientGender"
                        value={formData.patientGender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
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
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Update Prescription
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPrescription;
