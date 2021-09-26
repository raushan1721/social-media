import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import axios from "../../helpers/axios";
import Error from "../../components/ui/Alert";
import { useLocation } from 'react-router-dom';
function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(null);
  const location = useLocation();
  const query = location.search.slice(1, location.search.length);
  
  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);
    if (password === cpassword) {
      await axios.post(`/createpassword?${query}`, {
        password
      }).then((res) => {
        setVariant("success");
          setMessage(res.data.message);
      })
        .catch(error => {
          setVariant("danger");
          setMessage("something went wrong");
      })
    }
    
}
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            {show ? <Error message={message} variant={variant} show={show} /> :
                        <Form onSubmit={handleClick}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>new password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter new Password"
                            required
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>confirm password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            required
                            value={cpassword}
                            onChange={(e)=>setCpassword(e.target.value)}
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
            }

          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CreateNewPassword;
