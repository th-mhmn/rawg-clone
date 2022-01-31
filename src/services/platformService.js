import axios from "axios";
import { genreGamesURL, genreURL, platformsURL } from "./api";

export const getAllPlatforms = async () => {
  const { data: platforms } = axios.get(platformsURL);
  return platforms;
};

export const getPlatform = async (platform_name) => {
  const { data: genre } = await axios.get(genreURL(platform_name));
  return genre;
};

export const getPlatformGames = async (platform_name) => {
  const { data: games } = await axios.get(genreGamesURL(platform_name));
  return { list: games.results, next: games.next, count: games.count };
};
