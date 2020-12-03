import React, { Fragment, useState } from "react";
import { useQuery } from "@apollo/client";
import AddCommentMutation from "./AddComment";
import {
  ListItem,
  List,
  ListDiv,
  PElem,
  Button,
  ButtonWrapper,
} from "./Styles";
import { COMMENTS } from "./queries/Queries";

export const Comments = () => {
  const [page, setPage] = useState(10);

  const { loading, data } = useQuery(COMMENTS);

  const nextPage = (comments) => {
    if (page + 10 > comments.length) {
      return setPage(comments.length);
    }
    return setPage(page + 10);
  };
  const reset = () => {
    return setPage(10);
  };

  if (loading) return <p>Loading...</p>;
  const comments = data.getComments.map(
    ({ park_name, subject, comment, date, user, _id }) => (
      <ListItem key={_id}>
        <ListDiv>
          <PElem>
            <strong>park name:</strong> {park_name}
          </PElem>
          <PElem>
            <strong>subject:</strong> {subject}
          </PElem>
        </ListDiv>
        <ListDiv>
          <PElem>
            <strong>text:</strong> {comment}
          </PElem>
          <PElem>
            <strong>at:</strong> {new Date(date).toLocaleTimeString()}
          </PElem>
        </ListDiv>
        <ListDiv>
          <PElem>
            <strong>by:</strong> {user && user.user_name}
          </PElem>
          <PElem>
            <strong>on:</strong> {new Date(date).toLocaleDateString()}
          </PElem>
        </ListDiv>
      </ListItem>
    )
  );
  return (
    <Fragment>
      <AddCommentMutation />
      <List>{comments.slice(0, page)}</List>
      <ButtonWrapper>
        <Button
          primary
          onClick={() => {
            nextPage(comments);
          }}
        >
          See More
        </Button>
        <Button onClick={() => reset(comments)}>Reset</Button>
      </ButtonWrapper>
    </Fragment>
  );
};
