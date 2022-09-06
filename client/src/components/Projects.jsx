import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import CreateProjectModal from "../components/CreateProjectModal";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <>
      <Stack direction="horizontal" gap={3} className="mt-3">
        <h2>Projects</h2>
        <Button
          onClick={() => setShowCreateProjectModal(true)}
          variant="outline-primary"
          className="d-flex align-items-center"
        >
          <IoAdd />
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {!loading && !error && data?.allProjects.length > 0 ? (
          data.allProjects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })
        ) : (
          <h3 className="py-3">No projects in database</h3>
        )}
      </div>

      <CreateProjectModal
        show={showCreateProjectModal}
        setShow={setShowCreateProjectModal}
      />
    </>
  );
}
