import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePrescription, getPrescriptions } from '../services/prescriptionService';
import Swal from 'sweetalert2';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [startDate, setStartDate] = useState('2025-01-20'); // default start date
    const [endDate, setEndDate] = useState('2025-02-20');  // default end date
    const navigate = useNavigate();

    // Fetch prescriptions whenever startDate or endDate changes
    useEffect(() => {
        fetchPrescriptions();
    }, [startDate, endDate]);

    const fetchPrescriptions = async () => {
        try {
            // Make sure we pass valid dates
            const data = await getPrescriptions(startDate, endDate);
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleDelete = async (id) => {
        // Show SweetAlert2 confirmation dialog
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Perform the delete action
                    await deletePrescription(id);

                    // Re-fetch prescriptions after successful deletion
                    fetchPrescriptions();

                    // Show success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your prescription has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Error deleting prescription:', error);
                    // Show error message
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete prescription. Please try again.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div className="container mx-auto p-4">
            {/* "Create Prescription" button */}
            <div className="mb-4">
                <button
                    onClick={() => navigate('create')}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Create Prescription
                </button>
            </div>

            {/* Date filters */}
            <div className="flex justify-between mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded"
                />
                <button onClick={fetchPrescriptions} className="bg-blue-500 text-white p-2 rounded">
                    Filter
                </button>
            </div>

            {/* Prescriptions Table */}
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Patient Name</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Gender</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription) => (
                        <tr key={prescription.id}>
                            <td className="border p-2">{prescription.prescriptionDate}</td>
                            <td className="border p-2">{prescription.patientName}</td>
                            <td className="border p-2">{prescription.patientAge}</td>
                            <td className="border p-2">{prescription.patientGender}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => navigate(`edit/${prescription.id}`)}
                                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(prescription.id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrescriptionList;
