import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
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
      const res = await axios.post("https://your-api-url.com/signup", {
        email: form.email,
        password: form.password,
      });
      setSuccess("Signup successful!");
      setForm({ email: "", password: "", confirmPassword: "" });
      setTouched({ email: false, password: false, confirmPassword: false });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row>
        <Col>
          <Card className="shadow p-4" style={{ minWidth: "350px" }}>
            <Card.Body>
              <h2 className="mb-4 text-center">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
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
                  <Form.Label>Password</Form.Label>
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
                    />
                    <Form.Control.Feedback type="invalid">
                      Password is required.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
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
                  className="w-100"
                  disabled={
                    !allFilled ||
                    !passwordsMatch ||
                    !isEmailValid ||
                    loading
                  }
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                </Button>
              </Form>
              <div className="mt-3 text-center">
                Already have an account?{" "}
                <Link to="/login">Log in</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;