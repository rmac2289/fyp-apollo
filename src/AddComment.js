import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Input, Form, Label } from "./Styles";
import { COMMENTS } from "./queries/Queries";
import { ADD_COMMENT_MUTATION } from "./mutations/Mutations";

const AddCommentMutation = () => {
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [parkName, setParkName] = useState("");
  const getSubject = (e) => setSubject(e.target.value);
  const getComment = (e) => setComment(e.target.value);
  const getParkName = (e) => setParkName(e.target.value);

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update(cache, { data }) {
      // We use an update function here to write the
      // new value of the COMMENTS query.
      const newCommentFromResponse = data?.insert_parkfinder_comments;
      const existingComments = cache.readQuery({
        query: COMMENTS,
      });

      if (existingComments && newCommentFromResponse) {
        cache.writeQuery({
          query: COMMENTS,
          data: {
            parkfinder_comments: [
              ...existingComments?.parkfinder_comments,
              newCommentFromResponse,
            ],
          },
        });
      }
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment({
      variables: {
        objects: {
          park_name: parkName,
          subject: subject,
          comment: comment,
        },
      },
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Label>
        Subject
        <Input type="text" value={subject} onChange={getSubject} />
      </Label>
      <Label>
        Comment
        <Input type="text" value={comment} onChange={getComment} />
      </Label>
      <Label>
        Park Name
        <Input type="text" value={parkName} onChange={getParkName} />
      </Label>
      <Button primary>Submit</Button>
    </Form>
  );
};

export default AddCommentMutation;
