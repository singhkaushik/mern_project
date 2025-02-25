import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const resp = await axios.post(
          "http://localhost:4000/api/v1/users/signin",
          values
        );
        const token = resp.data.token;
        const decodedToken = jwtDecode(token); 
        localStorage.setItem("authToken", token);
        // console.log("Decoded Token:", decodedToken);

        const userRole = decodedToken.role; 
        localStorage.setItem("user", JSON.stringify({ token, role: userRole }));

        setMessage(resp.data.msg);
        setMessageType("success");

          navigate("/dashboard");
      } catch (e) {
        setMessage(
          e.response?.data?.msg || "Something went wrong. Please try again."
        );
        setMessageType("danger");
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center vh-60">
      <Card className="shadow-lg p-4 rounded" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login to Your Account</h2>

          {message && <Alert variant={messageType}>{message}</Alert>}

          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                {...formik.getFieldProps("password")}
                isInvalid={formik.touched.password && formik.errors.password}
                placeholder="Enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
