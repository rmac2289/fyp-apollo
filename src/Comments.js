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
import { formatDate } from "./Utils";

export const Comments = () => {
  const [max, setMax] = useState(10);
  const [page, setPage] = useState(10);

  const { loading, data, fetchMore } = useQuery(COMMENTS, {
    // variables: {
    //   minId: 0,
    //   maxId: max,
    // },
  });

  const seeMore = () => {
    setMax(max + 10);
  };
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
  const comments = data.parkfinder_comments.map(
    ({ park_name, subject, comment, date, parkfinder_user, id }) => (
      <ListItem key={id}>
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
          <div></div>
        </ListDiv>
        <ListDiv>
          <PElem>
            <strong>by:</strong> {parkfinder_user && parkfinder_user.user_name}
          </PElem>
          <PElem>
            <strong>on:</strong> {formatDate(date)}
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
