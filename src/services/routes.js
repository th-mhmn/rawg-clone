import { getList } from "./gameService";
import { getGenre, getGenreGames } from "./genreService";

// const genres = ["action", "indie", "role-playing-games-rpg", "adventure"];
// const genresPath = genres.map((genre) => `/games/${genre}`);

// export const genresRoutes = genresPath.map((path) => ({
//   path: path,
//   info: () => getGenre(`${genres.map((genre) => genre.split("/"[2]))}`),
//   games: () => getGenreGames(`${genres.map((genre) => genre.split("/"[2]))}`),
// }));
//
// console.log(genresRoutes);

export const homeRoutes = [
  {
    path: "/",
    data: () => getList("trending"),
    title: "New and Trending",
  },
  {
    path: "/games",
    data: () => getList("all"),
    title: "All Games",
  },
  {
    path: "/discover/upcoming",
    data: () => getList("upcoming"),
    title: "Upcoming Games",
  },
  {
    path: "/discover/last-30-days",
    data: () => getList("new"),
    title: "Last 30 Days",
  },
  {
    path: "/discover/popular-in-2020",
    data: () => getList("best-of-2020"),
    title: "Popular in 2020",
  },
  {
    path: "/discover/best-of-the-year",
    data: () => getList("best-of-year"),
    title: "Best Games of the Year",
  },
  {
    path: "/discover/next-week",
    data: () => getList("next-week"),
    title: "Next Week",
  },
  {
    path: "/discover/this-week",
    data: () => getList("this-week"),
    title: "This Week",
  },
];

export const genresRoutes = [
  {
    path: "/games/action",
    info: () => getGenre("action"),
    games: () => getGenreGames("action"),
  },
  {
    path: "/games/indie",
    info: () => getGenre("indie"),
    games: () => getGenreGames("indie"),
  },
  {
    path: "/games/role-playing-games-rpg",
    info: () => getGenre("role-playing-games-rpg"),
    games: () => getGenreGames("role-playing-games-rpg"),
  },
  {
    path: "/games/adventure",
    info: () => getGenre("adventure"),
    games: () => getGenreGames("adventure"),
  },
  {
    path: "/games/strategy",
    info: () => getGenre("strategy"),
    games: () => getGenreGames("strategy"),
  },
  {
    path: "/games/shooter",
    info: () => getGenre("shooter"),
    games: () => getGenreGames("shooter"),
  },
  {
    path: "/games/puzzle",
    info: () => getGenre("puzzle"),
    games: () => getGenreGames("puzzle"),
  },
  {
    path: "/games/racing",
    info: () => getGenre("racing"),
    games: () => getGenreGames("racing"),
  },
  {
    path: "/games/sports",
    info: () => getGenre("sports"),
    games: () => getGenreGames("sports"),
  },
  {
    path: "/games/casual",
    info: () => getGenre("casual"),
    games: () => getGenreGames("casual"),
  },
  {
    path: "/games/simulation",
    info: () => getGenre("simulation"),
    games: () => getGenreGames("simulation"),
  },
  {
    path: "/games/arcade",
    info: () => getGenre("arcade"),
    games: () => getGenreGames("arcade"),
  },
  {
    path: "/games/platformer",
    info: () => getGenre("platformer"),
    games: () => getGenreGames("platformer"),
  },
  {
    path: "/games/massively-multiplayer",
    info: () => getGenre("massively-multiplayer"),
    games: () => getGenreGames("massively-multiplayer"),
  },
  {
    path: "/games/fighting",
    info: () => getGenre("fighting"),
    games: () => getGenreGames("fighting"),
  },
  {
    path: "/games/family",
    info: () => getGenre("family"),
    games: () => getGenreGames("family"),
  },
  {
    path: "/games/board-games",
    info: () => getGenre("board-games"),
    games: () => getGenreGames("board-games"),
  },
  {
    path: "/games/educational",
    info: () => getGenre("educational"),
    games: () => getGenreGames("educational"),
  },
  {
    path: "/games/card",
    info: () => getGenre("card"),
    games: () => getGenreGames("card"),
  },
];
