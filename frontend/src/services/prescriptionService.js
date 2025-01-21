const API_BASE_URL = "http://localhost:8080/api/v1/prescriptions";

export const getPrescriptions = async (startDate, endDate) => {
    // Ensure the URL format is correct without a trailing `/prescriptions`
    const url = `${API_BASE_URL}?startDate=${startDate}&endDate=${endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// Fetch prescription by ID
export const getPrescriptionById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();
    return data;
};

// Create a new prescription
export const createPrescription = async (prescription) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(prescription),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

// Update an existing prescription
export const updatePrescription = async (id, prescription) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(prescription),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

// Delete a prescription
export const deletePrescription = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    return response;
};
export const getDayWiseReport = async (startDate, endDate) => {
    const response = await fetch(`${API_BASE_URL}/day-wise-report?startDate=${startDate}&endDate=${endDate}`);
    const data = await response.json();
    return data;
};