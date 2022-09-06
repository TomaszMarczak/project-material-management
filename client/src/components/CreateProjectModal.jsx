import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

export default function CreateClientModal({ show, setShow }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("new");
  const [client, setClient] = useState();

  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: name,
      description: description,
      status: status,
      client: client,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "" || client === "") {
      alert("Can't do that");
    } else {
      addProject(name, description, status, client);
      setShow(false);
      setName("");
      setDescription("");
      setStatus("new");
      setClient("");
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-2">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter project name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              type="text"
              placeholder="Enter project description"
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Status:</Form.Label>
            <Form.Select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="new">Not started</option>
              <option value="progress">In progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Client:</Form.Label>
            <Form.Select
              onChange={(e) => setClient(e.target.value)}
              value={client}
            >
              <option value="">Select client</option>
              {!loading &&
                !error &&
                data.allClients.map((client) => {
                  return (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="primary"
            className="float-end"
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
