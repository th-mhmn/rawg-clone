import {
  allGamesURL,
  gameDetailsURL,
  gameScreenshotsURL,
  newGames,
  nextWeekURL,
  popular,
  searchGameURL,
  storesURL,
  thisWeekURL,
  trendingURL,
  upcomingGamesURL_2Years,
} from "./api";
import axios from "axios";

const getURL = (title) => {
  switch (title) {
    case "trending":
      return trendingURL;
    case "all":
      return allGamesURL;
    case "new":
      return newGames.lastMonth;
    case "best-of-year":
      return popular.thisYear;
    case "best-of-2020":
      return popular.lastYear;
    case "upcoming":
      return upcomingGamesURL_2Years;
    case "next-week":
      return nextWeekURL;
    case "this-week":
      return thisWeekURL;
    default:
      return allGamesURL;
  }
};

export const getList = async (title, query) => {
  const URL = getURL(title);
  const { data } = await axios.get(URL);
  return {
    list: data.results,
    next: data.next,
    count: data.count,
  };
};

export const getGameDetails = async (slug) => {
  const { data: details } = await axios.get(gameDetailsURL(slug));
  const { data: screenshots } = await axios.get(gameScreenshotsURL(slug));
  const { data: store } = await axios.get(storesURL(slug));
  return { details, screenshots, store };
};

export const getScreenshots = async (slug) => {
  const { data: images } = await axios.get(gameScreenshotsURL(slug));
  return images;
};

export const getSearchSuggest = async (e) => {
  const { data } = await axios.get(searchGameURL(e.target.value, 7));
  return data;
};

export const getNext = async (next_URL) => {
  const { data: next } = await axios.get(next_URL);
  return next;
};
// const handleSearch = async (query) => {
//   setQuery(query);
//   const { data } = await axios.get(searchGameURL(query, 10));
//   return { list: data.results, next: data.next, count: data.count };
// };
