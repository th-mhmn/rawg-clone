import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { getPlatform } from '../util/platformsIcon'
import { getResizedImage } from '../util/imageResize'
import { motion } from 'framer-motion'
import MetaScore from '../components/common/MetaScore'
import { getDate } from '../util/date'
import Image from '../components/Image'
import { getGameDetails } from '../services/gameService'
import { getStoreIcon } from '../util/storesIcon'

const Game = ({ slug }) => {
  // States
  const [game, setGame] = useState(null)
  const [screenshots, setScreenshots] = useState()
  const [image, setImage] = useState({ show: false, id: null })
  const [stores, setStores] = useState(null)
  const [storeHovered, setStoreHovered] = useState(null)
  // useEffects
  useEffect(() => {
    async function getGame(slug) {
      const { details, screenshots, store } = await getGameDetails(slug)
      setGame(details)
      setStores(store.results)
      setScreenshots(screenshots.results)
    }
    slug && getGame(slug)
  }, [slug])

  if (game) {
    document.title = `${game.name} - release date, screenshots, reviews on RAWG`
  }

  return (
    <>
      {image.show ? (
        <Image image={image} setImage={setImage} slug={slug} />
      ) : (
        <>
          {game && (
            <>
              <ImageCover>
                <Background
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={getResizedImage(game.background_image, 1280)}
                  alt={game.name}
                />
              </ImageCover>
              <Shadow />
              <Container
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', duration: 1.2 }}
              >
                <LeftContent>
                  <div className="top">
                    {game.released && (
                      <span className="released">{getDate(game.released)}</span>
                    )}
                    <Platforms>
                      {game.parent_platforms &&
                        game.parent_platforms.map((data) => (
                          <img
                            src={getPlatform(data.platform.name)}
                            key={data.platform.id}
                            alt={data.platform.name}
                          />
                        ))}
                    </Platforms>
                    {game.playtime !== 0 && (
                      <span className="playtime">
                        AVERAGE PLAYTIME: {game.playtime} HOUR
                        {game.playtime > 1 && <span>S</span>}
                      </span>
                    )}
                  </div>
                  <h1 id="name">{game.name}</h1>
                  <Description>
                    <h2>About</h2>
                    {parse(`${game.description}`)}
                    <div className="columns">
                      <Column>
                        <h3>Platforms</h3>
                        <div>
                          {game.platforms.map((data, index) => (
                            <h4 key={data.platform.id}>
                              {data.platform.name}
                              {index !== game.platforms.length - 1 && (
                                <span>, </span>
                              )}
                            </h4>
                          ))}
                        </div>
                      </Column>
                      {game.metacritic && (
                        <Column className="meta">
                          <h3 style={{ marginBottom: '0.7rem' }}>Metascore</h3>
                          <MetaScore score={game.metacritic} />
                        </Column>
                      )}

                      <Column>
                        <h3>Genre</h3>
                        {game.genres.map((genre, index) => (
                          <h4 key={genre.id}>
                            {genre.name}
                            {index !== game.genres.length - 1 && (
                              <span>, </span>
                            )}
                          </h4>
                        ))}
                      </Column>
                      {game.released && (
                        <Column>
                          <h3>Release Date</h3>
                          <h4>{getDate(game.released)}</h4>
                        </Column>
                      )}
                      {game.developers && (
                        <Column>
                          <h3>Developer</h3>
                          {game.developers.map((developer, index) =>
                            game.developers.length === 1 ? (
                              <h4 key={developer.id}>{developer.name}</h4>
                            ) : (
                              <h4 key={developer.id}>
                                {developer.name}
                                {index !== game.developers.length - 1 ? (
                                  <span>, </span>
                                ) : null}
                              </h4>
                            )
                          )}
                        </Column>
                      )}
                      {game.publishers && (
                        <Column>
                          <h3>Publisher</h3>
                          {game.publishers.map((developer, index) =>
                            game.publishers.length === 1 ? (
                              <h4 key={developer.id}>{developer.name}</h4>
                            ) : (
                              <h4 key={developer.id}>
                                {developer.name}
                                {index !== game.publishers.length - 1 ? (
                                  <span>, </span>
                                ) : null}
                              </h4>
                            )
                          )}
                        </Column>
                      )}
                    </div>
                  </Description>
                </LeftContent>
                <RightContent>
                  <Pictures>
                    {screenshots &&
                      screenshots.map((shot) => (
                        <ImageContainer key={shot.id}>
                          <img
                            onClick={() =>
                              setImage({ show: true, id: shot.id })
                            }
                            src={getResizedImage(shot.image, 200)}
                            alt={game.name}
                          />
                        </ImageContainer>
                      ))}
                  </Pictures>
                  {stores && stores.length !== 0 && (
                    <>
                      <h3>Where to buy</h3>
                      <Stores>
                        {game.stores.map((store) => (
                          <Store
                            onMouseOver={() => setStoreHovered(store.store.id)}
                            onMouseOut={() => setStoreHovered(null)}
                            key={store.id}
                          >
                            <a href={stores.find((s) => s.id === store.id).url}>
                              <h4>{store.store.name}</h4>
                            </a>
                            {store.store.slug && (
                              <img
                                src={
                                  storeHovered === store.store.id
                                    ? getStoreIcon(`${store.store.slug}-black`)
                                    : getStoreIcon(`${store.store.slug}-grey`)
                                }
                                alt={store.name}
                              />
                            )}
                          </Store>
                        ))}
                      </Stores>
                    </>
                  )}
                </RightContent>
              </Container>
            </>
          )}
        </>
      )}
    </>
  )
}

const Container = styled(motion.div)`
  display: flex;
  width: 100%;
  margin: 0 8rem 0 6rem;
  max-width: 100%;
  h3 {
    color: #444444;
    font-size: 1rem;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin: 1rem;
    max-width: 100%;
    #name {
      font-size: 30px;
      overflow-wrap: revert;
      @media (max-width: 768px) {
        margin: 1rem 0;
      }
    }
  }
`

const Background = styled(motion.img)`
  width: 100%;
  height: auto;
  z-index: -1;
  object-fit: cover;
  max-width: 100%;
`
const ImageCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80vh;
  z-index: -1;
  overflow-y: hidden;
  width: 100%;
`
const Shadow = styled(motion.div)`
  width: 100%;
  height: 80vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  object-fit: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), #151515);
  //background: rgba(#151515, 0.5);
`

const LeftContent = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 2.2rem 1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
  .top {
    display: flex;
    flex-wrap: wrap;
    span.released {
      background-color: white;
      padding: 0 0.5rem;
      border-radius: 5px;
      font-size: 0.91rem;
      font-weight: 380;
      margin-right: 0.7rem;
    }
    @media (max-width: 768px) {
      justify-content: center;
    }
    span.playtime {
      color: white;
      font-weight: 400;
      font-size: 0.85rem;
      letter-spacing: 0.2rem;
    }
  }
`
const RightContent = styled.div`
  width: 45%;
  margin-top: 2.2rem;
  margin-left: 2rem;
  h3 {
    font-size: 1.5rem;
    font-weight: 450;
    color: hsla(0, 0%, 100%, 0.4);
  }
  @media (max-width: 768px) {
    display: block;
  }
`

const Platforms = styled.div`
  img {
    width: 17px;
    height: 17px;
    margin: 0 5px;
  }
  margin-right: 0.7rem;
`

const Description = styled.div`
  margin-top: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  h4 {
    display: inline;
    font-weight: 400;
  }
  h3 {
    color: white;
    margin: 0.5rem 0;
    font-weight: 550;
    font-size: 1.2rem;
  }

  h2 {
    margin-bottom: 0.5rem;
  }
  .columns {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 1.5rem 0 1rem 0;
    .meta {
      display: flex;
      flex-direction: column;
      @media (max-width: 768px) {
        align-items: center;
      }
    }
  }
`

const Column = styled.div`
  width: 50%;
  max-height: 50%;
  margin-top: 1rem;
  h3 {
    color: hsla(0, 0%, 100%, 0.2);
    font-weight: 500;
    font-size: 1rem;
  }
  &:nth-child(even) {
    padding-left: 1.5rem;
  }
  &:nth-child(odd) {
    max-width: 40%;
  }

  h4 {
    margin-top: 0.5rem;
  }
`

const Pictures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: 3rem;
  row-gap: 1rem;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`
const ImageContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transition: all ease 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  img {
    cursor: pointer;
  }
  @media (max-width: 768px) {
  }
`
const Stores = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Store = styled.div`
  width: 45%;
  height: 50px;
  background-color: #2d2d2d;
  border-radius: 10px;
  margin: 0.6rem 0;
  cursor: pointer;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;
  //justify-content: space-around;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1rem;
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 1rem;
  }
  &:hover {
    background-color: white;
    h4 {
      color: black;
    }
  }
  &:nth-child(even) {
    margin-left: auto;
  }
  h4 {
    color: #6f6f6f;
    font-weight: 400;
  }
`

export default Game
