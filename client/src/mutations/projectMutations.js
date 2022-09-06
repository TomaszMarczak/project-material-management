import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
      }
    }
  }
`;

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $client: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $client
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { DELETE_PROJECT, ADD_PROJECT };
