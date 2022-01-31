import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import GlobalStyles from "./components/common/GlobalStyles";
import Nav from "./components/common/Nav";
import Sidebar from "./components/common/Sidebar";
import styled from "styled-components";
import { Route, Switch, useLocation } from "react-router-dom";
import axios from "axios";

import LoadBar from "./components/common/LoaderBar";
import { searchGameURL } from "./services/api";
import { genresRoutes, homeRoutes } from "./services/routes";
import Game from "./pages/Game";

const App = () => {
  // UseState
  const [query, setQuery] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slug, setSlug] = useState(null);
  const location = useLocation();

  // UseEffects
  useEffect(() => {
    setIsLoaded(false);
    setSlug(location.pathname.split("/")[2]);
  }, [location]);

  useEffect(() => {
    setIsLoaded(true);
  }, [slug]);

  const handleSearch = async (query) => {
    setQuery(query);
    const { data } = await axios.get(searchGameURL(query, 10));
    return { list: data.results, next: data.next, count: data.count };
  };

  const homeRouteComponents = homeRoutes.map(({ path, title, data }, key) => (
    <Route exact path={path} key={key}>
      <LoadBar />
      <Home title={title} list={data} />
    </Route>
  ));

  const genreRouteComponents = genresRoutes.map(
    ({ path, info, games, title }, key) => (
      <Route exact path={path} key={key}>
        <LoadBar />
        <Home list={games} info={info} title={title} />
      </Route>
    )
  );
  return (
    <>
      <GlobalStyles />
      <Nav handleSearch={handleSearch} />
      <Container>
        <Sidebar />
        <Switch location={location} key={location.key}>
          {homeRouteComponents}
          {genreRouteComponents}
          <Route exact path="/search">
            <LoadBar />
            <Home list={handleSearch} title="Search Results" query={query} />
          </Route>
          <Route path="/games/:id">
            <LoadBar />
            {isLoaded && <Game slug={slug} />}
          </Route>
        </Switch>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
`;

export default App;
