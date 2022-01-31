import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeIn } from "../util/animations";

const GenreDescription = ({ info }) => {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    async function getInfo() {
      const data = await info();
      setDetails({ name: data.name, description: data.description });
    }
    getInfo();
  }, []);

  return (
    <>
      {details && (
        <Container variants={fadeIn} initial="initial" animate="animate">
          <div>
            <h1>{details.name} Games</h1>
          </div>
          {parse(`${details.description}`)}
        </Container>
      )}
    </>
  );
};

const Container = styled(motion.div)`
  h1 {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.03rem;
    letter-spacing: 0.003em;
  }
`;

export default GenreDescription;
