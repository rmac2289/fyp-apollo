import gql from "graphql-tag";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";

const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($objects: [parkfinder_comments_insert_input!]!) {
    insert_parkfinder_comments(objects: $objects) {
      returning {
        comment
        date
      }
    }
  }
`;

const AddCommentMutation = (props) => {
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [parkName, setParkName] = useState("");
  const getSubject = (e) => setSubject(e.target.value);
  const getComment = (e) => setComment(e.target.value);
  const getParkName = (e) => setParkName(e.target.value);

  const [addComment, { data }] = useMutation(ADD_COMMENT_MUTATION);

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
    <form onSubmit={onSubmit}>
      <label>
        Subject
        <input type="text" value={subject} onChange={getSubject} />
      </label>
      <label>
        Comment
        <input type="text" value={comment} onChange={getComment} />
      </label>
      <label>
        Park Name
        <input type="text" value={parkName} onChange={getParkName} />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default AddCommentMutation;
