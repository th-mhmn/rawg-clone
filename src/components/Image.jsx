import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoaderSpinner from "./common/LoaderSpinner";
import { getResizedImage } from "../util/imageResize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { getScreenshots } from "../services/gameService";

const Image = ({ image, setImage, slug }) => {
  const [img, setImg] = useState(null);
  useEffect(() => {
    async function getImage(id) {
      const images = await getScreenshots(slug);
      setImg(images.results.find((img) => img.id === id));
    }
    getImage(image.id);
  }, [image]);

  return (
    <>
      {img ? (
        <Container
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
        >
          <button onClick={() => setImage({ id: null, show: false })}>
            <FontAwesomeIcon id="icon" icon={faTimes} />
          </button>
          <ImgContainer>
            <Img src={getResizedImage(img.image, 1280)} />
          </ImgContainer>
        </Container>
      ) : (
        <Loader>
          <LoaderSpinner />
        </Loader>
      )}
    </>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(10, 10, 10, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease 0.3s;
  
  }

  button {
    width: 55px;
    height: 55px;
    background-color: #1a1a1a;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all ease 0.3s;
    position: absolute;
    top: 2.5%;
    right: 1.5%;
    &:hover {
      background-color: white;
      #icon{
        color: black
      }
    }
    #icon {
      color: white;
      width: 30px;
      height: 30px;
      
  }
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 85%;
  border-radius: 30px;
  overflow: hidden;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  @media (max-width: 768px) {
    object-fit: contain;
  }
`;
const Loader = styled.div`
  width: 100%;
  height: 100%;
`;
export default Image;
