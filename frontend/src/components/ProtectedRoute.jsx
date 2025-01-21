import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService"; // Auth logic

const ProtectedRoute = () => {
    const auth = isAuthenticated(); // Check authentication

    if (!auth) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return <Outlet />; // Render the child components if authenticated
};

export default ProtectedRoute;
