import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EditProjectModal({ show, setShow, projectId }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: projectId,
      name: name,
      description: description,
      status: status,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  useEffect(() => {
    if (!loading && !error) {
      setName(data.project.name);
      setDescription(data.project.description);
      setStatus(() => {
        switch (data.project.status) {
          case "Not Started":
            return "new";
          case "In Progress":
            return "progress";
          case "Completed":
            return "completed";
          default:
            throw new Error(`Unknown status: ${data.project.status}`);
        }
      });
    }
  }, [data, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !description && status) {
      return alert("Can't do that");
    } else {
      updateProject(name, description, status);
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="my-2">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              defaultValue={data?.project.name}
              required
              type="text"
              placeholder="Enter project name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              defaultValue={data?.project.description}
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="new">Not started</option>
              <option value="progress">In progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="primary"
            className="float-end"
          >
            Edit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
