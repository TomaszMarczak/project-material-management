import React from "react";
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Stack className="my-5 align-items-center">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to="/">
        <Button className="my-3">Go back</Button>
      </Link>
    </Stack>
  );
}
