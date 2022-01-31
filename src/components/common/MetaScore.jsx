import React from "react";
import styled from "styled-components";

const getColor = (score) => {
  if (score >= 75) return "#66cc33";
  if (score >= 50 && score <= 74) return "#FFCC33";
  return "#ff0000";
};

const MetaScore = ({ score }) => {
  const color = getColor(score);
  return (
    <Box style={{ border: `1px solid ${color}` }}>
      <span style={{ color: `${color}` }}>{score}</span>
    </Box>
  );
};

const Box = styled.div`
  width: 2rem;
  height: 25px;
  text-align: center;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1rem;
    font-weight: bold;
  }
`;

export default MetaScore;
