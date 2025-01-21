import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Notifications
import "react-toastify/dist/ReactToastify.css"; // Styles for notifications
import Navbar from "./components/Navbar"; // Navbar component
import Login from "./components/Login";
import Home from "./pages/Home";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PrescriptionList from "./components/PrescriptionList";
import PrescriptionForm from "./components/PrescriptionForm";
import DayWiseReport from "./components/DayWiseReport";
import NotFound from "./pages/NotFound";
import EditPrescription from "./components/EditPrescription";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/prescriptions" element={<ProtectedRoute />}>
          <Route index element={<PrescriptionList />} />
          <Route path="create" element={<PrescriptionForm />} />
          <Route path="edit/:id" element={<EditPrescription />} />
        </Route>

        <Route path="/report" element={<ProtectedRoute />}>
          <Route index element={<DayWiseReport />} />
        </Route>

        {/* Fallback Route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
