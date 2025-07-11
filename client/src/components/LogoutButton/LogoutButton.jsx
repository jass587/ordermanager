import { Button } from "@themesberg/react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/signin");
  };

  return (
    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
