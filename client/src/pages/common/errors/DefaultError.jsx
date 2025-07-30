import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function DefaultError({ fullScreen = true }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const role = decoded.role;

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Invalid token");
      navigate("/signin");
    }
  };

  return (
    <div className={`centered-error text-center py-5 ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4 text-danger">Something Went Wrong</h1>
      <p className="lead">We encountered an unexpected error. Please try again later.</p>
      <button className="btn btn-primary mt-3 px-4 py-2" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}
