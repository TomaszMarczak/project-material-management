import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    allProjects {
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

export { GET_PROJECTS };
