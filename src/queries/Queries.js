import { gql } from "@apollo/client";

export const COMMENTS = gql`
  query getComments {
    getComments {
      _id
      park_name
      subject
      comment
      date
      user {
        user_name
      }
    }
  }
`;
export const PARK_BY_NAME = gql`
  query getParkByName($fullName: String!) {
    getParkByName(fullName: $fullName) {
      _id
      fullName
      state
      map
      latLng
      activities
      entranceFees {
        cost
        title
      }
      url
      weatherInfo
      hours
      description
      images {
        url
        altText
        title
      }
      address
    }
  }
`;

export const PARKS = gql`
  query getPark {
    getPark {
      _id
      fullName
      state
      map
      latLng
      activities
      entranceFees {
        cost
        title
      }
      url
      weatherInfo
      hours
      description
      images {
        url
        altText
        title
      }
      address
    }
  }
`;
