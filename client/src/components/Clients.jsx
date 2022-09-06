import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from "./ClientRow";
import CreateClientModal from "./CreateClientModal";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <>
      <Stack direction="horizontal" gap={3} className="mt-3">
        <h2>Clients</h2>
        <Button
          onClick={() => setShowCreateClientModal(true)}
          variant="outline-primary"
          className="d-flex align-items-center"
        >
          <IoAdd />
        </Button>
      </Stack>
      {data.allClients.length > 0 ? (
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
            {data.allClients.map((client, index) => {
              return (
                <ClientRow key={client.id} client={client} index={index} />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h3 className="py-3">No clients in database</h3>
      )}
      <CreateClientModal
        show={showCreateClientModal}
        setShow={setShowCreateClientModal}
      />
    </>
  );
}
