import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getResizedImage } from "../util/imageResize";
import { Link } from "react-router-dom";
import { getPlatform } from "../util/platformsIcon";
import MetaScore from "./common/MetaScore";
import { AnimatePresence, motion } from "framer-motion";
import { popup } from "../util/animations";
import { getScreenshots } from "../services/gameService";
import LoaderSpinner from "./common/LoaderSpinner";
import { getDate } from "../util/date";

const GameCard = ({ game }) => {
  const {
    name,
    background_image: img,
    slug,
    metacritic,
    parent_platforms,
    released,
  } = game;
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(getResizedImage(img, 640));
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [spanHovered, setSpanHovered] = useState(false);

  useEffect(() => {
    async function getImages() {
      const { results } = await getScreenshots(slug);
      setImages(results);
      // setImages(results.map)
      // setImages(results.map(result => getResizedImage(result, 640)))
    }
    getImages();
    setIsLoaded(true);
  }, [cardHovered, slug]);

  return (
    <Card
      variants={popup}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.03 }}
      onMouseOver={() => {
        setCardHovered(true);
      }}
      onMouseLeave={() => {
        setCardHovered(false);
        setCurrentImage(getResizedImage(img, 640));
      }}
    >
      <div className="container">
        <div id="image-wrap">
          {isLoaded ? (
            <motion.img
              variants={popup}
              src={getResizedImage(currentImage, 640)}
              alt="img"
            />
          ) : (
            <LoaderSpinner width={50} height={50} />
          )}
        </div>
        {cardHovered && (
          <Gallery>
            <AnimatePresence>
              <motion.div
                initial={{ y: "10px" }}
                animate={{ y: 0 }}
                exit={{ y: "10px" }}
              >
                {images &&
                  images.map((image) => (
                    <span
                      onMouseOver={() => {
                        setCurrentImage(image.image);
                        setSpanHovered(image.id);
                      }}
                      onMouseOut={() => setSpanHovered(null)}
                      key={image.id}
                    >
                      <div
                        style={
                          spanHovered === image.id
                            ? { background: "hsla(0, 0%, 100%, .85)" }
                            : { background: "hsla(0, 0%, 100%, .4)" }
                        }
                        className="bar"
                      />
                    </span>
                  ))}
              </motion.div>
            </AnimatePresence>
          </Gallery>
        )}
      </div>
      <div onMouseOver={() => setCurrentImage(getResizedImage(img, 640))}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Platforms>
            {parent_platforms &&
              parent_platforms.map((data) => (
                <img
                  src={getPlatform(data.platform.name)}
                  key={data.platform.id}
                  alt={data.platform.name}
                />
              ))}
          </Platforms>
          {metacritic && <MetaScore score={metacritic} />}
        </div>
        <div className="name">
          <Link to={`/games/${slug}`}>{name}</Link>
        </div>
        {/*{released && <span className="released">{getDate(game.released)}</span>}*/}
      </div>
    </Card>
  );
};

const Card = styled(motion.div)`
  //min-height: 4rem;
  width: 290px;
  color: white;
  background: #202020;
  font-size: 2rem;
  padding-bottom: 1rem;
  border-radius: 13px;
  overflow: hidden;
  position: relative;
  transition: all ease 0.3s;
  z-index: 0;
  display: flex;
  flex-direction: column;
  .container {
    width: 100%;
    height: 180px;
    position: relative;
    #image-wrap {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }
  }
  .name {
    padding: 0.5rem 1rem;
    font-weight: 630;
    font-size: 1.7rem;
    width: 90%;
  }
  .released {
    background-color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
    font-size: 0.91rem;
    font-weight: 380;
    margin-right: 0.7rem;
    color: black;
  }
`;

const Platforms = styled.div`
  margin-left: 1rem;
  img {
    width: 17px;
    height: 17px;
    margin-right: 0.5rem;
  }
`;

const Gallery = styled.div`
  width: 100%;
  //height: 10%;
  z-index: 2;
  display: flex;
  justify-content: center;
  div:nth-child(1) {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    z-index: 0;
    display: flex;
    padding: 0 0.5rem;
    margin-bottom: 0.6rem;
  }
  span {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    .bar {
      width: 70%;
      height: 5px;
      border-radius: 5px;
    }
  }
`;

export default GameCard;
