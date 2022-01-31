import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { getResizedImage } from '../../util/imageResize'
import { getAllGenres } from '../../services/genreService'

const Sidebar = () => {
  const [genres, setGenres] = useState(null)
  const [showAllGenres, setShowAllGenres] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  let width = window.innerWidth

  useEffect(() => {
    async function getGenres() {
      const { results } = await getAllGenres()
      setGenres(results)
    }
    getGenres()
  }, [])

  return (
    <>
      {width > 768 ? (
        <StyledSidebar>
          <div>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              to="/games"
            >
              All Games
            </NavLink>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              to="/discover/upcoming"
            >
              Upcoming Games
            </NavLink>
            <h3>Top</h3>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              className="item"
              to="/discover/best-of-the-year"
            >
              Best of the year
            </NavLink>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              className="item"
              to="/discover/popular-in-2020"
            >
              Popular in 2020
            </NavLink>
            <h3>New Releases</h3>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              className="item"
              to="/discover/last-30-days"
            >
              Last 30 days
            </NavLink>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              className="item"
              to="/discover/this-week"
            >
              This Week
            </NavLink>
            <NavLink
              activeStyle={{ fontWeight: 'bolder', color: 'grey' }}
              className="item"
              to="/discover/next-week"
            >
              Next Week
            </NavLink>
            <h3>Genres</h3>
            <div
              style={
                showAllGenres
                  ? {
                      height: 'auto',
                      overflowY: 'revert',
                      top: '-150%',
                    }
                  : {
                      maxHeight: '150px',
                      overflowY: 'hidden',
                    }
              }
            >
              {genres &&
                genres.map((genre) => (
                  <Row key={genre.id}>
                    <NavLink
                      className="item no-hover"
                      to={`/games/${genre.slug}`}
                    >
                      <div className="img-container">
                        <img
                          src={getResizedImage(genre.image_background, 200)}
                          alt={genre.name}
                        />
                      </div>
                      <h5>{genre.name}</h5>
                    </NavLink>
                  </Row>
                ))}
            </div>
            <ShowAll onClick={() => setShowAllGenres(!showAllGenres)}>
              <Icon>
                <FontAwesomeIcon
                  id="icon"
                  icon={showAllGenres ? faAngleUp : faAngleDown}
                />
              </Icon>
              <h6>
                {showAllGenres ? <span>Hide</span> : <span>Show All</span>}
              </h6>
            </ShowAll>
          </div>
        </StyledSidebar>
      ) : (
        <>
          <MenuButton onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon id="bars" icon={showMenu ? faTimes : faBars} />
          </MenuButton>
          {showMenu && <Menu />}
        </>
      )}
    </>
  )
}

const MenuButton = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2%;
  left: 2%;
  cursor: pointer;
  transition: all ease 0.3s;
  border-radius: 30px;
  z-index: 5;
  &:hover {
    background: rgba(80, 80, 80, 0.6);
  }
  #bars {
    color: white;
    width: 30px;
    height: 30px;
  }
`

const Menu = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 90%;
  background: #151515;
  border-radius: 50px;
  z-index: 4;
`

const StyledSidebar = styled.div`
  max-width: 24vw;
  max-height: 110vh;
  padding: 2rem 2.3rem;
  position: sticky;
  top: -110%;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
  }

  &::-webkit-scrollbar-track {
    background-color: #151515;
  }
  h3 {
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  a {
    font-size: 1.5rem;
    font-weight: 650;
    display: block;
    margin-bottom: 1rem;
  }
  a.item {
    font-size: 1.2rem;
    font-weight: 400;
    //margin: 0.5rem 0;
  }
`

const Row = styled.div`
  margin-bottom: 0.6rem;
  .item {
    width: 100%;
    display: flex;
    align-items: center;
    h5 {
      font-weight: 400;
      font-size: 1.1rem;
    }
  }
  .img-container {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 5px;
    overflow: hidden;
    margin-right: 0.7rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

const ShowAll = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  h6 {
    font-size: 1rem;
    font-weight: 500;
  }
  &:hover {
    div {
      background: grey;
    }
    #icon {
      color: black;
      margin-top: 3px;
    }
  }
`

const Icon = styled.div`
  width: 30px;
  height: 30px;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-right: 0.5rem;
  #icon {
    width: 20px;
    height: 20px;
    color: grey;
  }
`
export default Sidebar
