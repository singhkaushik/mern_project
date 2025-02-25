import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../../yupSchema/RegisterSchema";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:4000/api/v1";

const Register = () => {
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [errorRoles, setErrorRoles] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/roles`);
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setRoles(response.data.map((role) => role.name));
        } else {
          setErrorRoles("Invalid roles data format from server.");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        setErrorRoles("Failed to load roles. Please try again.");
      } finally {
        setLoadingRoles(false);
      }
    };
    

    fetchRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log("Submitting Data:", values);
      setIsSubmitting(true);

      try {
        const response = await axios.post(`${API_URL}/users/signup`, values);
        setMessage(response.data.msg || "Registration successful!");
        setMessageType("success");
        formik.resetForm();

        setTimeout(() => {
          navigate("/login"); // Redirect to login after successful signup
        }, 2000);
      } catch (e) {
        setMessage(
          e.response?.data?.msg ||
            e.response?.data?.error ||
            "Something went wrong. Please try again."
        );
        setMessageType("danger");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "#f8f9fa" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-3">Register</h3>

        {message && <Alert variant={messageType}>{message}</Alert>}
        {errorRoles && <Alert variant="danger">{errorRoles}</Alert>}

        <Form onSubmit={formik.handleSubmit} noValidate>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("name")}
                  isInvalid={formik.touched.name && !!formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                {loadingRoles ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <Form.Select
                    {...formik.getFieldProps("role")}
                    isInvalid={formik.touched.role && !!formik.errors.role}
                  >
                    <option value="">Select Role</option>
                    {roles.length > 0 ? (
                      roles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))
                    ) : (
                      <option disabled>No roles available</option>
                    )}
                  </Form.Select>
                )}

                <Form.Control.Feedback type="invalid">
                  {formik.errors.role}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  {...formik.getFieldProps("password")}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...formik.getFieldProps("confirm_password")}
                  isInvalid={
                    formik.touched.confirm_password && !!formik.errors.confirm_password
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirm_password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size="sm" animation="border" /> : "Register"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Register;
