import { useNavigate } from "react-router-dom";
import "../../../assets/scss/app.scss";

export default function Forbidden({ fullScreen = true }) {
  const navigate = useNavigate();

  return (
    <div className={`centered-error text-center py-5 ${!fullScreen ? "embedded" : ""}`}>
      <h1 className="display-4 text-danger">403 - Forbidden</h1>
      <p className="lead">You don’t have permission to access this page.</p>
      <button className="btn btn-outline-danger mt-3 px-4 py-2" onClick={() => navigate("/signin")}>
       Sign in
      </button>
    </div>
  );
}
