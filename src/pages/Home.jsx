// Import Libraries
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import InfiniteScroll from 'react-infinite-scroll-component'
// Import Components
import GameCard from './../components/GameCard'
import LoaderSpinner from '../components/common/LoaderSpinner'
import '../masonry.css'
import { motion } from 'framer-motion'
import { fadeIn } from '../util/animations'
import { getNext } from '../services/gameService'
import GenreDescription from '../components/GenreDescription'
import ToTop from '../components/common/ToTop'

const Home = ({ list, title, query, info }) => {
  // States:
  const [gameList, setGameList] = useState({ list: [], next: '', count: null })
  const [isDropped, setIsDropped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showToTop, setShowToTop] = useState(false)
  // End States.
  // Refs:
  // UseEffects:

  useEffect(() => {
    async function getList() {
      setIsLoaded(false)
      setGameList(await list(query))
    }
    getList()
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [gameList])

  useEffect(() => {
    if (window.pageYOffset > 1000) setShowToTop(true)
    else setShowToTop(false)
  }, [window.pageYOffset])

  // End UseEffects.

  const fetchMoreGame = async () => {
    const next = await getNext(gameList.next)
    setGameList({
      list: [...gameList.list, ...next.results],
      next: next.next,
      count: next.count,
    })
  }

  return (
    <>
      {isLoaded ? (
        <Container variants={fadeIn} initial="initial" animate="animate">
          <Header>
            {info && <GenreDescription info={info} />}
            <h1>{title}</h1>
            {/* <Dropdown
              variants={fadeIn}
              onClick={() => setIsDropped(!isDropped)}
            >
              <p>
                Order by: <span>Popularity</span>
              </p>
              {isDropped && <DropdownMenu>h</DropdownMenu>}
            </Dropdown> */}
          </Header>

          {gameList && (
            <InfiniteScroll
              dataLength={gameList.list.length}
              next={fetchMoreGame}
              hasMore={true}
              loader={<LoaderSpinner />}
              endMessage={<LoaderSpinner />}
            >
              {gameList.list && (
                <Masonry
                  breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                  className="masonry-grid"
                  columnClassName="masonry-column"
                >
                  {gameList.list.map((game) => (
                    <GameCard game={game} key={game.id} />
                  ))}
                </Masonry>
              )}
            </InfiniteScroll>
          )}
        </Container>
      ) : (
        <LoaderSpinner />
      )}
      {showToTop && <ToTop setShowToTop={setShowToTop} />}
    </>
  )
}

const Container = styled(motion.div)`
  width: 100%;
  margin-right: 1.5rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
`

const Header = styled.div`
  h1 {
    font-size: 4rem;
  }
  margin: 1rem 0.5rem;
  @media (max-width: 768px) {
    text-align: center;
  }
`

const Dropdown = styled(motion.div)`
  background-color: #262626;
  width: 190px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  margin: 2rem 0;
  position: relative;
  @media (max-width: 768px) {
    margin: 2rem auto;
  }
  p {
    transition: all ease 0.3s;
    &:hover {
      color: #7d7d7d;
    }
    cursor: pointer;
  }
`

const DropdownMenu = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: absolute;
  left: 0;
  border-radius: 12px;
`

export default Home
