import React, {  useState } from "react";
import { Button, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { NavLink ,Redirect} from "react-router-dom";
import Layout from "../../components/Layout";
import Error from "../../components/ui/Alert";
import axios from "../../helpers/axios";
function Signin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(false);
    await axios.post("/signin", {
      username,
      password,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoggedIn(true);

    })
      .catch((error) => {
        setShow(true);
        setMessage(error.response.data.message);
        setVariant("danger");
    })
  };
  if (isLoggedIn) {
    return <Redirect to="/"/>
    }
  if (window.localStorage.getItem("token")) {
    setIsLoggedIn(true);
  }

  

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
          <Error message={message} variant={variant} show={show}/>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Nav style={{ justifyContent: "space-between" }}>
                <li className="nav-item">
                  <NavLink to="/forgotpassword" className="nav-link">
                    forgot password
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Don't have account?
                  <NavLink to="/signup" className="nav-link">
                    Sign up
                  </NavLink>
                </li>
              </Nav>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Signin;
