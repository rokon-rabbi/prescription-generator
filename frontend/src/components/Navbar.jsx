import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/authService";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = isAuthenticated(); // Check if the user is logged in

    const handleLogout = () => {
        logout(); // Clear token from localStorage
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    Prescription App
                </Link>
                <div className="flex items-center space-x-4">
                    {auth ? (
                        <>
                            <Link to="/prescriptions" className="hover:underline">
                                Prescriptions
                            </Link>
                            <Link to="/report" className="hover:underline">
                                Reports
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
