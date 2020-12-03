import React, { useState } from "react";
import { PARK_BY_NAME } from "./queries/Queries";
import { useQuery } from "@apollo/client";
import { Wrapper } from "./Styles";

export const Park = () => {
  const [parkName, setParkName] = useState("");
  const { data, loading } = useQuery(PARK_BY_NAME, {
    variables: {
      fullName: "Yosemite National Park",
    },
  });
  if (loading) return <p>loading</p>;
  let parkDetails = data.getParkByName;
  const getParkName = (e) => {
    setParkName((prevState) => (prevState = e.target.value));
  };
  return (
    <Wrapper>
      <input type="text" value={parkName} onChange={getParkName} />
      <header>
        <h1>
          <a href={parkDetails.url} target="_blank" rel="noopener noreferrer">
            {parkDetails.fullName}
          </a>
        </h1>
      </header>
      <img
        src={parkDetails.images[0].url}
        alt={parkDetails.images[0].altText}
        width="400"
      />
      ;
    </Wrapper>
  );
};
