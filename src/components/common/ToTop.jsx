import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const ToTop = ({ setShowToTop }) => {
  return (
    <Circle
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setShowToTop(false), 700);
      }}
    >
      <FontAwesomeIcon id="icon" icon={faAngleUp} />
    </Circle>
  );
};
const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
  bottom: 5%;
  right: 5%;
  z-index: 5;
  position: fixed;
  transition: all ease 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  #icon {
    color: white;
    width: 30px;
    height: 30px;
  }
  &:hover {
    transform: scale(1.2);
  }
`;
export default ToTop;
