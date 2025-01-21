
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Prescription Management System</h1>
            <p className="mb-4">Manage prescriptions, view day-wise reports, and more.</p>
            <Link to="/prescriptions" className="text-blue-500 hover:underline">
                Go to Prescriptions
            </Link>
        </div>
    );
};

export default Home;
