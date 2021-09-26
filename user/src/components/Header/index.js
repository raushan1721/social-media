import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "../../helpers/axios"
function Header() {
  const [isLoggedIn, setIsloggedIn] = useState(true);
  const logout =async () => {
    await axios.post("/signout");
    window.localStorage.clear();
    window.location.replace("/signin");
    setIsloggedIn(false);
  }
  if (!isLoggedIn) {
  return <Redirect to='/'/>
}
  const renderNonLoggedInLinks = () => {
    return (
      <>
        <Nav>
          <li className="nav-item">
            <NavLink to="/signin" className="nav-link">
              Sign in
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link">
              Sign up
            </NavLink>
          </li>
        </Nav>
      </>
    );
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item" onClick={logout} style={{cursor:"pointer"}}>
          <span className="nav-link">signout</span>
        </li>
      </Nav>
    );
  };
  const token = window.localStorage.getItem("token");
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/">messbook</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>

            {token?renderLoggedInLinks():renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  );
}

export default Header;
