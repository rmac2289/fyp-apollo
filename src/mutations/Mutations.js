import { gql } from "@apollo/client";

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($objects: [parkfinder_comments_insert_input!]!) {
    insert_parkfinder_comments(objects: $objects) {
      returning {
        subject
        comment
        park_name
        date
      }
    }
  }
`;
