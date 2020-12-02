import { ApolloCache } from "@apollo/client";
import { gql } from "@apollo/client";

export const COMMENTS = gql`
  query getComments {
    getComments {
      _id
      park_name
      subject
      comment
      date
      user {
        user_name
      }
    }
  }
`;
