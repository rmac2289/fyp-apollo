import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { PARKS } from "./queries/Queries";
import { List, ListItem, PElem, Button } from "./Styles";
import { QueryComponent } from "./queries/Queries";

export const Parks = () => {
  const [page, setPage] = useState(10);

  const nextPage = (comments) => {
    if (page + 10 > comments.length) {
      return setPage(comments.length);
    }
    return setPage(page + 10);
  };
  const reset = () => {
    return setPage(10);
  };
  const { data, loading, error } = useQuery(PARKS, {
    fetchPolicy: "cache-first",
  });
  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const parks = data.getPark.map((value) => {
    return (
      <ListItem key={value._id}>
        <PElem>
          <strong>Park: </strong>
          {value.fullName}
        </PElem>
        <PElem>
          <strong>Address: </strong>
          {value.address}
        </PElem>
        <PElem>
          <strong>Website: </strong>
          {value.url}
        </PElem>
      </ListItem>
    );
  });
  return (
    <List>
      {parks.slice(0, page)}
      <Button primary onClick={() => nextPage(parks)}>
        See more
      </Button>
      <Button onClick={() => reset(parks)}>Reset</Button>
    </List>
  );
};
