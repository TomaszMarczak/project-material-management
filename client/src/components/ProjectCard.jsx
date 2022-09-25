import { useMutation } from "@apollo/client";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsTrash, BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ProjectCard({
  project,
  setEditProjectId,
  setShowEditProjectModal,
}) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: project.id },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = (e) => {
    e.preventDefault();
    deleteProject();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditProjectId(project.id);
    setShowEditProjectModal(true);
  };

  return (
    <Card className="p-3">
      <Link
        to={`/projects/${project.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Title className="text-justify-end">
          <Row>
            <Col xs={8} className="d-flex align-items-center">
              {project.name}
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                className="ms-auto"
                onClick={handleEdit}
              >
                <BsFillGearFill />
              </Button>
              <Button
                variant="outline-danger"
                className="ms-1"
                onClick={handleDelete}
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
        <Card.Footer className="bg-white px-0 py-1">
          {project.status}
        </Card.Footer>
      </Link>
    </Card>
  );
}
