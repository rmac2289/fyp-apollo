import { gql } from "@apollo/client";

export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment(
    $comment: String!
    $subject: String!
    $park_name: String!
    $date: Date!
    $user: UserInput!
  ) {
    addComment(
      comment: $comment
      subject: $subject
      park_name: $park_name
      date: $date
      user: $user
    ) {
      subject
      comment
      park_name
      date
    }
  }
`;
