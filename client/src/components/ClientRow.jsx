import { useMutation } from "@apollo/client";
import { Button } from "react-bootstrap";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { BsTrash } from "react-icons/bs";

export default function ClientRow({ client, index }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: {
      id: client.id,
    },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <tr className="m-3">
      <td>{index + 1}</td>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <Button variant="outline-danger" onClick={deleteClient}>
          <BsTrash />
        </Button>
      </td>
    </tr>
  );
}
