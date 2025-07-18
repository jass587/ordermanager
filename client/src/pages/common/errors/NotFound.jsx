import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../../assets/scss/app.scss";

export default function NotFound({ fullScreen = true }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { role } = jwtDecode(token);
        navigate(role === "admin" ? "/admin/dashboard" : "/home");
      } else {
        navigate("/signin");
      }
    } catch {
      navigate("/signin");
    }
  };

  return (
    <div className={`centered-error text-center py-5 ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4 text-warning">404 - Page Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <button className="btn btn-outline-warning mt-3 px-4 py-2" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}
