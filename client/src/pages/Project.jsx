import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { Button, Stack } from "react-bootstrap";
import {
  BsFillTelephoneFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsTrash,
} from "react-icons/bs";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const navigate = useNavigate("/");

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: data?.project.id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <div className="mt-3">
      <Stack gap={3}>
        <Stack direction="horizontal" gap={2}>
          <h2>{data.project.name}</h2>{" "}
          <div className="text-muted">| {data.project.status}</div>
          <Link to="/">
            <Button variant="outline-secondary">Go back</Button>
          </Link>
          <Button
            variant="outline-danger"
            className="ms-auto"
            onClick={deleteProject}
          >
            <BsTrash />
          </Button>
        </Stack>
        <div className="text-muted">
          <b>Client details:</b>
          <br />
          <BsFillPersonFill className="me-1" />
          {data.project.client.name} <br />
          <BsFillEnvelopeFill className="me-1" /> {data.project.client.email}{" "}
          <br />
          <BsFillTelephoneFill className="me-1" />
          {data.project.client.phone} <br />
        </div>
        {data.project.description}
      </Stack>
    </div>
  );
}
