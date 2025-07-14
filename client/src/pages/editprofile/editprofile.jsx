import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Card, Alert, Spinner } from "@themesberg/react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap"; // ✅ Correct source


export default function EditProfile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showToast, setShowToast] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setMessage({ type: "danger", text: "Unable to load profile data." });
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await axios.put("http://localhost:5000/api/users/update", user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowToast(true); // Show the toast
      setMessage({ type: "success", text: "Profile updated successfully!" });
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

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">Profile updated successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
