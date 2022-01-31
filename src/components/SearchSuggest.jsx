import React from "react";
import styled from "styled-components";
import LoaderSpinner from "./common/LoaderSpinner";
import { getResizedImage } from "../util/imageResize";
import { getPlatform } from "../util/platformsIcon";
import { Link } from "react-router-dom";

const SearchSuggest = ({ list, isLoaded, setSuggested, setInput }) => {
  return (
    <Container>
      {!isLoaded ? (
        <LoaderSpinner />
      ) : (
        <List>
          {list.map((item) => (
            <Item key={item.id}>
              <div className="left-content">
                {item.background_image && (
                  <Link
                    to={`/games/${item.slug}`}
                    onClick={() => {
                      setSuggested(false);
                      setInput("");
                    }}
                  >
                    <img
                      src={getResizedImage(item.background_image, 420)}
                      alt={item.name}
                    />
                  </Link>
                )}
              </div>
              <div className="right-content">
                <Platforms className="platforms">
                  {item.parent_platforms &&
                    item.parent_platforms.map((data) => (
                      <img
                        src={getPlatform(data.platform.name)}
                        key={data.platform.id}
                        alt={data.platform.name}
                      />
                    ))}
                </Platforms>
                <Name>
                  <Link
                    onClick={() => {
                      setSuggested(false);
                      setInput("");
                    }}
                    to={`/games/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                </Name>
              </div>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  position: absolute;
  width: 100%;
  top: 130%;
  border-radius: 20px;
  z-index: 3;
  background-color: black;
  padding: 1rem;
`;

const List = styled.div`
  width: 100%;
  min-height: 100px;
`;

const Item = styled.div`
  display: flex;
  .left-content {
    height: 3rem;
    width: 2.6rem;
    overflow: hidden;
    border-radius: 7px;
    margin: 0 1rem 1rem 0;

    &:hover {
      img {
        filter: brightness(55%);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all ease 0.25s;
    }
    .right-content {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Platforms = styled.div`
  img {
    width: 1rem;
    height: 1rem;
    margin-right: 5px;
  }
`;
const Name = styled.div`
  color: white;
  font-weight: 500;
`;

export default SearchSuggest;
