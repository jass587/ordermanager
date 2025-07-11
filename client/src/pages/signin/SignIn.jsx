import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import BgImage from "../../assets/img/illustrations/signin.svg";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = res.data;

      if (data.status === 200 && data.result.length > 0) {
        const token = data.result[0].token;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const { role } = decoded;

        localStorage.setItem("role", role);

        if (role === "admin") navigate("/admin/dashboard/");
        else navigate("/dashboard");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error or network issue.");
      }
    }
  };

  return (
    <main style={{ width: '100vw' }}>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5" style={{ width: '100vw' }}>
        <Container>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>

                {error && <p className="text-danger text-center">{error}</p>}

                <Form className="mt-4" onSubmit={handleLogin}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        type="email"
                        placeholder="example@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  {/* Google */}
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-danger me-2"
                    onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
                  >
                    <FontAwesomeIcon icon={faGoogle} />
                  </Button>

                  {/* Facebook */}
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2"
                    onClick={() => window.location.href = "http://localhost:5000/api/auth/facebook"}
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>

                  {/* Twitter */}
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-twitter me-2"
                    onClick={() => window.location.href = "http://localhost:5000/api/auth/twitter"}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>

                  {/* GitHub */}
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-dark"
                    onClick={() => window.location.href = "http://localhost:5000/api/auth/github"}
                  >
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
