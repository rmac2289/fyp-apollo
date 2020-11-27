import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import AddCommentMutation from "./Mutation";
import { ListItem, List } from "./Styles";

export const COMMENTS = gql`
  query getComments {
    parkfinder_comments {
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

const formatDate = (date) => {
  let YYMMDD = date.slice(0, 10).split("-");
  let [year, month, day] = [YYMMDD[0], YYMMDD[1], YYMMDD[2]];
  let time = `${date.slice(11, 16)} UTC `;
  return `${month}/${day}/${year}, ${time}`;
};

export const Comments = () => {
  const { loading, error, data } = useQuery(COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  const comments = data.parkfinder_comments.map(
    ({ park_name, subject, comment, date, parkfinder_user, id }) => (
      <ListItem key={id}>
        <p>
          <strong>park name:</strong> {park_name}
        </p>
        <p>
          <strong>subject:</strong> {subject}
        </p>
        <p>
          <strong>text:</strong> {comment}
        </p>
        <p>
          <strong>by:</strong> {parkfinder_user && parkfinder_user.user_name}
        </p>
        <p>
          <strong>on:</strong> {formatDate(date)}
        </p>
      </ListItem>
    )
  );
  return (
    <Fragment>
      <AddCommentMutation />
      <List>{comments}</List>
    </Fragment>
  );
};
