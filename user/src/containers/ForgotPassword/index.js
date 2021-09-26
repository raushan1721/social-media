import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Error from "../../components/ui/Alert";
import Layout from "../../components/Layout";
import axios from "../../helpers/axios";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShow(true);
    await axios
      .post("/forgotpassword", {
        email,
      })
      .then((res) => {
        setVariant("success");

        setMessage(res.data.message);
      })
      .catch((err) => {
        setVariant("danger");
        setMessage("something went wrong");
      });
  };
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Error message={message} variant={variant} show={show} />
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)&setShow(false)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ForgotPassword;
