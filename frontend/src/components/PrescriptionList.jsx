import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePrescription, getPrescriptions } from '../services/prescriptionService';
import Swal from 'sweetalert2';

const PrescriptionList = () => {
    const navigate = useNavigate();

    // Function to get the first and last date of the current month
    const getCurrentMonthDates = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        return { firstDay, lastDay };
    };

    const { firstDay, lastDay } = getCurrentMonthDates();

    const [prescriptions, setPrescriptions] = useState([]);
    const [startDate, setStartDate] = useState(firstDay);
    const [endDate, setEndDate] = useState(lastDay);

    // Fetch prescriptions whenever startDate or endDate changes
    useEffect(() => {
        fetchPrescriptions();
    }, [startDate, endDate]);

    const fetchPrescriptions = async () => {
        try {
            const data = await getPrescriptions(startDate, endDate);
            setPrescriptions(data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
        }
    };

    const handleDelete = async (id) => {
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
                    await deletePrescription(id);
                    fetchPrescriptions();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your prescription has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error('Error deleting prescription:', error);
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
