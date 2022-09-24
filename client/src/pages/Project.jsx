import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <div className="mt-3">
      <Stack gap={3}>
        <Stack direction="horizontal" gap={3}>
          <h2>{data.project.name}</h2>{" "}
          <div className="text-muted">| {data.project.status}</div>
          <Link to="/">
            <Button variant="outline-secondary">Go back</Button>
          </Link>
        </Stack>
        <div className="text-muted">
          <b>Client details:</b>
          <br />
          {data.project.client.name} <br />
          {data.project.client.email} <br />
          {data.project.client.phone} <br />
        </div>
        {data.project.description}
      </Stack>
    </div>
  );
}
