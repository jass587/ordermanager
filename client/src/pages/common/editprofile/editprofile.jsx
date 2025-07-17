import { useEffect, useState } from "react";
import { Form, Button, Card, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../../../services/api/auth";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState({ type: "", text: "" });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(4, "Password must be at least 4 characters").notRequired(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const payload = {
          name: values.name,
          email: values.email,
        };
        if (values.password) payload.password = values.password;

        await AuthService.updateProfile(payload);
        setToastMsg({ type: "success", text: "Profile updated successfully!" });
      } catch (err) {
        setToastMsg({ type: "danger", text: "Update failed. Please try again." });
      } finally {
        setLoading(false);
        setShowToast(true);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    AuthService.getProfile()
      .then(({ name, email }) => {
        formik.setValues({ name, email, password: "" });
      })
      .catch(() => {
        setToastMsg({ type: "danger", text: "Failed to load user data." });
        setShowToast(true);
      });
  }, []);

  return (
    <>
      <Card className="p-4 w-100 shadow-sm" style={{ margin: "2rem auto" }}>
        <h4 className="mb-3">Edit Profile</h4>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.touched.name && !!formik.errors.name}
              placeholder="Enter your name"
              required
            />
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              isInvalid={formik.touched.email && !!formik.errors.email}
              placeholder="Enter your email"
              required
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={formik.touched.password && !!formik.errors.password}
              placeholder="Change password (optional)"
            />
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
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
        <Toast
          bg={toastMsg.type}
          show={showToast}
          delay={3000}
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Body className="text-white">{toastMsg.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
