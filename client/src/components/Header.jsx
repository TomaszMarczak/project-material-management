import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Navbar.Brand className="text-white">
            Project Material MGMT
          </Navbar.Brand>
        </Link>
        <Navbar.Text className="text-white">
          Based on app by B. Traversy
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
