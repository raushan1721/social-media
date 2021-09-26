import React, { useState } from "react";
import { Col, Container, Form, Row, Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout";
import axios from "../../helpers/axios";
import Error from "../../components/ui/Alert";
function Signup({token}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    if (password === cpassword) {
      await axios
        .post("/signup", {
          username,
          email,
          password,
        })
        .then((res) => {
          setVariant("success");
          setMessage(res.data.message);
        })
        .catch((err) => {
          setVariant("danger");
          setMessage(err.response.data.message);

        });
    } else {
      setVariant("danger");
      setMessage("password and confirm password not matches");
    }
  };
  if (window.localStorage.getItem("token")) {
    window.location.replace("/");
  }
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Error message={message} variant={variant} show={show}/>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cpassword}
                  required
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </Form.Group>
              <Nav style={{ justifyContent: "space-between" }}>
                <li
                  className="nav-item"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Already have an account?
                  <NavLink to="/signin" className="nav-link">
                    Sign in
                  </NavLink>
                </li>
              </Nav>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signup;
