const API_BASE_URL = "http://localhost:8080/api/users";

export const register = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(
            error.message || Object.values(error).join(", ") || "Registration failed"
        );
    }

    return await response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Login failed. Invalid credentials.");
    }

    localStorage.setItem("authToken", result.token); // Store the token in localStorage
    return result;
};

export const logout = () => {
    localStorage.removeItem("authToken"); // Clear token
};

export const isAuthenticated = () => {
    // Check if the token is stored in localStorage
    return localStorage.getItem("authToken") !== null;
};
