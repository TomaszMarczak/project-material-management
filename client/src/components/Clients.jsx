import { useQuery } from "@apollo/client";
import { Button, Stack, Table } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  return (
    <>
      <Stack direction="horizontal" gap={3} className="mt-3">
        <h2>Clients</h2>
        <Button variant="outline-primary" className="d-flex align-items-center">
          <IoAdd />
        </Button>
      </Stack>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            !error &&
            data.allClients.map((client, index) => {
              return (
                <ClientRow key={client.id} client={client} index={index} />
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
