import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function SocialLoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded.role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Delay slightly to ensure localStorage is set
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/home");
          }
        }, 100); // adjust if needed
      } catch (err) {
        console.error("Token decoding error:", err);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return <h4 className="text-center mt-5">Signing you in...</h4>;
}
