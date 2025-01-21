import { useState, useEffect } from 'react';
import { getDayWiseReport } from '../services/prescriptionService';
import Swal from 'sweetalert2';

const DayWiseReport = () => {
    const [report, setReport] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getDayWiseReport(startDate, endDate);
                setReport(data);
            } catch (error) {
                console.error('Error fetching day-wise report:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load the report. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        };

        if (startDate && endDate) {
            fetchReport();
        }
    }, [startDate, endDate]);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Day-Wise Prescription Count Report</h2>

            {/* Date Range Picker */}
            <div className="flex justify-center space-x-4 mb-6">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 mt-1 block w-40 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="p-2 mt-1 block w-40 border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Report Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Date</th>
                            <th className="py-3 px-6 text-left">Prescription Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="py-4 px-6 text-center text-gray-500">No prescriptions found for the selected date range</td>
                            </tr>
                        ) : (
                            report.map((item, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-6">{item.day}</td>
                                    <td className="py-3 px-6">{item.count}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* No Data Message */}
            {report.length === 0 && (
                <div className="mt-6 text-center">
                    <p className="text-lg text-gray-500">Please select a date range to see the report.</p>
                </div>
            )}
        </div>
    );
};

export default DayWiseReport;
