import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const allFilled = Object.values(form).every((val) => val.trim());
  const passwordsMatch = form.password === form.confirmPassword;
  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Replace URL with your actual backend endpoint!
      const res = await axios.post("http://localhost:5000/api/signup", {
        email: form.email,
        password: form.password,
      });
      setSuccess("Signup successful!");
      setForm({ email: "", password: "", confirmPassword: "" });
      setTouched({ email: false, password: false, confirmPassword: false });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        // minHeight: "100vh",
        
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1.5rem",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card
              className="p-4 shadow-lg"
              style={{
                borderRadius: "1rem",
                boxShadow:
                  "0 8px 16px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
                animation: "fadeInUp 0.6s ease forwards",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Card.Body>
                <h2
                  className="mb-4 text-center"
                  style={{
                    fontWeight: "700",
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    color: "#2c3e50",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                  }}
                >
                  Sign Up
                </h2>
                {error && (
                  <Alert variant="danger" className="shadow-sm">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="shadow-sm">
                    {success}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label
                      style={{ fontWeight: "600", color: "#34495e" }}
                    >
                      Email Address
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && (!form.email || !isEmailValid)}
                        required
                        style={{ boxShadow: "none" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {!form.email
                          ? "Email is required."
                          : !isEmailValid
                          ? "Please enter a valid email."
                          : ""}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label
                      style={{ fontWeight: "600", color: "#34495e" }}
                    >
                      Password
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !form.password}
                        required
                        style={{ boxShadow: "none" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password is required.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formConfirmPassword">
                    <Form.Label
                      style={{ fontWeight: "600", color: "#34495e" }}
                    >
                      Confirm Password
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          touched.confirmPassword &&
                          (!form.confirmPassword || !passwordsMatch)
                        }
                        required
                        style={{ boxShadow: "none" }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {!form.confirmPassword
                          ? "Please confirm your password."
                          : !passwordsMatch
                          ? "Passwords do not match."
                          : ""}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-bold"
                    disabled={
                      !allFilled || !passwordsMatch || !isEmailValid || loading
                    }
                    style={{
                      padding: "0.6rem 1.2rem",
                      fontSize: "1.1rem",
                      borderRadius: "0.6rem",
                      boxShadow: "0 4px 8px rgb(0 123 255 / 0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "")
                    }
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                  </Button>
                </Form>
                <div
                  className="mt-3 text-center"
                  style={{ color: "#34495e", fontWeight: "600" }}
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: "#007bff",
                      textDecoration: "none",
                      fontWeight: "700",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    Log in
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Optional: CSS animation inside style tag or external stylesheet */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
