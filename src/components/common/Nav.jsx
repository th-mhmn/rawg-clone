import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import SearchSuggest from "../SearchSuggest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getSearchSuggest } from "../../services/gameService";
// 2802995707

const Nav = ({ handleSearch }) => {
  const history = useHistory();
  const [input, setInput] = useState("");
  const [suggested, setSuggested] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const suggestSearch = async (e) => {
    setInput(e.target.value);
    setIsLoaded(false);
    const data = await getSearchSuggest(e);
    if (e.target.value === "") {
      setSuggested(null);
      setIsLoaded(true);
      return;
    }
    setSuggested(data.results);
    setIsLoaded(true);
  };
  const submitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?${input}`);
    handleSearch(input);
    setInput("");
    setSuggested(null);
  };
  return (
    <>
      <NavContainer>
        <Logo>
          <h5>
            <Link to="/">R A W G</Link>
          </h5>
        </Logo>

        <Search>
          <form onSubmit={submitSearch}>
            <FontAwesomeIcon id="search-icon" icon={faSearch} />
            <input
              value={input}
              onChange={suggestSearch}
              type="text"
              role="searchbox"
            />
            {suggested && (
              <SearchSuggest
                isLoaded={isLoaded}
                setSuggested={setSuggested}
                list={suggested}
                setInput={setInput}
              />
            )}
          </form>
        </Search>
      </NavContainer>
      {suggested && <Background onClick={() => setSuggested(false)} />}
    </>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
`;

const NavContainer = styled.nav`
  width: 100%;
  height: 14vh;
  display: flex;
  align-items: center;
  padding: 2.5rem 2.3rem;
  margin-bottom: -1rem;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem 0;
    justify-content: center;
  }
  .background {
    width: 100%;
    height: 100%;
    position: fixed;
  }
`;

const Logo = styled.div`
  font-size: 1.6rem;
  h5 {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Search = styled.div`
  margin: 0 2rem;
  flex: 1;
  position: relative;
  form {
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      #search-icon {
        color: black;
      }
    }
    #search-icon {
      color: grey;
      position: absolute;
      left: 1.5%;
      @media (max-width: 768px) {
        left: 6%;
      }
    }
  }
  input {
    height: 44px;
    border-radius: 24px;
    width: 100%;
    background-color: rgba(80, 80, 80, 0.6);
    transition: all ease 0.3s;
    font-size: 1.1rem;
    padding: 0 3rem;
    &:hover {
      background-color: white;
      color: black;
    }
    &:focus {
      background-color: white;
      color: black;
    }
    @media (max-width: 768px) {
      width: 300px;
    }
  }
`;

export default Nav;
