import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({}); // Field-specific errors
    const [error, setError] = useState(""); // General error
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});
        setError("");

        // Frontend validation
        if (userData.password !== userData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register({
                username: userData.username,
                email: userData.email,
                password: userData.password,
            });
            navigate("/login");
        } catch (err) {
            // Handle field-specific errors
            try {
                const parsedErrors = JSON.parse(err.message);
                setErrors(parsedErrors); // Example: { username: "Error message", email: "Error message" }
            } catch {
                setError(err.message); // General error
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-sm bg-white p-6 rounded shadow"
            >
                <h2 className="text-2xl font-semibold mb-6">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={userData.username}
                        onChange={(e) =>
                            setUserData({ ...userData, username: e.target.value })
                        }
                        required
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={userData.password}
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={userData.confirmPassword}
                        onChange={(e) =>
                            setUserData({ ...userData, confirmPassword: e.target.value })
                        }
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Register
                </button>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
