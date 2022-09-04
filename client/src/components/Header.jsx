import React from "react";
import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand className="text-white">
          Project Material MGMT
        </Navbar.Brand>
        <Navbar.Text className="text-white">Hello</Navbar.Text>
      </Container>
    </Navbar>
  );
}
