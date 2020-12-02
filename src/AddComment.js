import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Input, Form, Label } from "./Styles";
import { COMMENTS } from "./queries/Queries";
import { ADD_COMMENT_MUTATION } from "./mutations/Mutations";

const AddCommentMutation = () => {
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [park_name, setParkName] = useState("");
  const getSubject = (e) => setSubject(e.target.value);
  const getComment = (e) => setComment(e.target.value);
  const getParkName = (e) => setParkName(e.target.value);

  const [addComment] = useMutation(ADD_COMMENT_MUTATION, {
    update(cache, { data }) {
      // We use an update function here to write the
      // new value of the COMMENTS query.
      const newCommentFromResponse = data?.addComment;
      const existingComments = cache.readQuery({
        query: COMMENTS,
      });

      if (existingComments && newCommentFromResponse) {
        cache.writeQuery({
          query: COMMENTS,
          data: {
            getComments: [
              ...existingComments?.getComments,
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
        park_name: park_name,
        subject: subject,
        comment: comment,
        date: new Date().toISOString(),
        user: {
          user_name: "username1",
          _id: "5fc72feeda56a1d5254d1781",
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
        <Input type="text" value={park_name} onChange={getParkName} />
      </Label>
      <Button primary>Submit</Button>
    </Form>
  );
};

export default AddCommentMutation;
