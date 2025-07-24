import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/api/auth";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col, Row, Form, Card, Button, InputGroup, Container
} from "@themesberg/react-bootstrap";
import BgImage from "../../../assets/img/illustrations/signin.svg";
import { fetchCartFromBackend, syncCartToBackend } from "../../../redux/thunks/cartThunks";
import { mergeCarts } from "../../../utilities/mergeCart";
import { clearCart, setCart } from "../../../redux/store/cartSlice";
import { toast } from "react-toastify";

export default function SignIn() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const guestCart = useSelector((state) => state.cart.items);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(4, "Min 4 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const res = await AuthService.login(values.email, values.password);

        if (res.success) {
          const { role } = res;
          localStorage.setItem("role", role);

          // ✅ Step 1: Load DB cart
          const dbCart = await dispatch(fetchCartFromBackend()).unwrap();

          // ✅ Step 2: Merge guest cart (if any)
          if (guestCart.length > 0) {
            const merged = mergeCarts(dbCart, guestCart);

            await dispatch(syncCartToBackend(merged)); // update DB
            dispatch(setCart(merged)); // update redux
          } else {
            dispatch(setCart(dbCart)); // just use DB cart
          }

          toast.success("Login successful!");

          // ✅ Step 3: Redirect
          navigate(role === "admin" ? "/admin/dashboard/" : "/home");
        } else {
          setError(res.message || "Invalid login credentials");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError(err.message || "Server error or network issue.");
      }
    },
  });

return (
  <main style={{ width: '100vw' }}>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
      <Container>
        <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center mb-4">
                <h3 className="mb-0">Sign in to our platform</h3>
              </div>

              {error && <p className="text-danger text-center">{error}</p>}

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Your Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.email && !!formik.errors.email}
                      placeholder="example@company.com"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Your Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FontAwesomeIcon icon={faUnlockAlt} /></InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                      placeholder="Password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">Sign in</Button>
              </Form>

              <div className="mt-3 mb-4 text-center"><span className="fw-normal">or login with</span></div>
              <div className="d-flex justify-content-center my-4">
                <Button variant="outline-light" className="btn-icon-only btn-pill text-danger me-2" onClick={() => AuthService.socialRedirect("google")}>
                  <FontAwesomeIcon icon={faGoogle} />
                </Button>
                <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2" onClick={() => AuthService.socialRedirect("twitter")}>
                  <FontAwesomeIcon icon={faTwitter} />
                </Button>
                <Button variant="outline-light" className="btn-icon-only btn-pill text-dark" onClick={() => AuthService.socialRedirect("github")}>
                  <FontAwesomeIcon icon={faGithub} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
);
}
