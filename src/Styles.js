import styled from "styled-components";

export const Form = styled.form`
  width: 400px;
  background: black;
  color: white;
  margin: 10px auto auto auto;
  display: flex;
  flex-direction: column;
  padding: 2%;
  border-radius: 10px;
`;
export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 1%;
`;
export const Input = styled.input`
  padding: 0.5%;
  margin-top: 5px;
`;
export const Button = styled.button`
  width: 75px;
  padding: 1%;
  margin: 1%;
  border: 1px solid ${(props) => (props.primary ? "blue" : "red")};
`;
export const ListItem = styled.div`
  padding: 2%;
  border-bottom: 10px solid black;
`;
export const List = styled.div`
  list-style: none;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
export const ListDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PElem = styled.p`
  margin: 0;
`;
export const ButtonWrapper = styled.div`
  width: 90%;
  margin: auto;
`;
