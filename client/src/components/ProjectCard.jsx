import { useMutation } from "@apollo/client";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ProjectCard({ project }) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  return (
    <Card className="p-3">
      <Card.Title className="text-justify-end">
        <Row>
          <Col xs={10} className="d-flex align-items-center">
            {project.name}
          </Col>
          <Col xs={2} className="d-flex align-items-center">
            <Button
              variant="outline-danger"
              className="ms-auto"
              onClick={deleteProject}
            >
              <BsTrash />
            </Button>
          </Col>
        </Row>
      </Card.Title>
      <Card.Subtitle className="text-muted">
        for: {project.client?.name}
      </Card.Subtitle>
      <Card.Body className="px-0 py-2 mt-2">{project.description}</Card.Body>
      <Card.Footer className="bg-white px-0 py-1">{project.status}</Card.Footer>
    </Card>
  );
}
