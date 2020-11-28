import { ApolloCache } from "@apollo/client";
import { gql } from "@apollo/client";

export const COMMENTS = gql`
  query getComments($offset: Int, $limit: Int, $minId: Int, $maxId: Int) {
    parkfinder_comments(
      offset: $offset
      limit: $limit
      where: { id: { _gte: $minId, _lte: $maxId } }
      order_by: { id: desc }
    ) {
      id
      park_name
      subject
      comment
      date
      parkfinder_user {
        user_name
      }
    }
  }
`;
