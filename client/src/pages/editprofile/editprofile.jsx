import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Form, Button, Card, Alert, Spinner } from "@themesberg/react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap"; // 🟢 Use react-bootstrap for toast

export default function EditProfile() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showToast, setShowToast] = useState(false);
  const [initialPwd, setInitialPwd] = useState("********"); // placeholder to compare

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { name, email } = res.data;
        console.log({ data: { name, email } });
        setUser({ name, email, password: "" });
        setInitialPwd("");
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setMessage({ type: "danger", text: "Could not load user data." });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        name: user.name,
        email: user.email,
      };

      // Only include new password if it's changed from initial
      if (user.password && user.password !== initialPwd) {
        payload.password = user.password;
      }

      await axios.put("http://localhost:5000/api/users/update", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setShowToast(true);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage({ type: "danger", text: "Failed to update profile. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="p-4 w-100 shadow-sm" style={{ margin: "2rem auto" }}>
        <h4 className="mb-3">Edit Profile</h4>

        {message.text && (
          <Alert variant={message.type} className="mb-3">
            {message.text}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Change password (optional)"
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Form>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" show={showToast} delay={3000} onClose={() => setShowToast(false)} autohide>
          <Toast.Body className="text-white">Profile updated successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={message.type === "danger" ? "danger" : "success"}
          show={!!message.text}
          delay={3000}
          autohide
          onClose={() => setMessage({ type: "", text: "" })}
        >
          <Toast.Body className="text-white">
            {message.text}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
