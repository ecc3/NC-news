import styled from "styled-components";

const SmallButton = styled.button`
  background: ${props => (props.primary ? "#4056a1" : "transparent")};
  color: ${props => (props.primary ? "white" : "#f13c20")};
  font-weight: ${props => (props.primary ? "none" : "bold")};
  font-size: 1em;
  border-radius: 3px;
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border: ${props => (props.primary ? "2px solid white" : "2px solid #f13c20")};
  font-family: "Roboto", sans-serif;
`;

export default SmallButton;
