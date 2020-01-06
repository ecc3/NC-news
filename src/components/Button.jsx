import styled from "styled-components";

const Button = styled.button`
  background: ${props => (props.primary ? "#4056a1" : "transparent")};
  color: ${props => (props.primary ? "white" : "#f13c20")};
  font-size: 1em;
  font-weight: bold;
  border-radius: 0px;
  display: inline-block;
  padding: 0.5rem 0.5rem;
  margin: 0rem;
  min-width: fit-content;
  max-width: 200px;
  border: none;
  font-family: "Roboto", sans-serif;
`;

export default Button;
