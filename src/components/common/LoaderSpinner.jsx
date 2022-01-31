import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const LoaderSpinner = ({ height, width }) => {
  return (
    <Container>
      <Loader
        type="TailSpin"
        color="#ffffff"
        height={height || 75}
        width={width || 75}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export default LoaderSpinner;
