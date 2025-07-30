import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../../assets/scss/app.scss";

export default function ServerError({ fullScreen = true }) {
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
      <h1 className="display-4 text-danger">500 - Server Error</h1>
      <p className="lead">Something went wrong on our end.</p>
      <button className="btn btn-danger mt-3 px-4 py-2" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}
