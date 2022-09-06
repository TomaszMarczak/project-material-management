import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

export default function CreateClientModal({ show, setShow }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      alert("Can't do that");
    } else addClient(name, email, phone);
    setShow(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-2">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required
              value={name}
              type="text"
              placeholder="Enter client name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              required
              value={email}
              type="email"
              placeholder="Enter client email"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              required
              value={phone}
              type="text"
              placeholder="Enter client phone"
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="primary"
            className="float-end"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
