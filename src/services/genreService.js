import axios from "axios";
import { genreGamesURL, genresURL, genreURL } from "./api";

export const getAllGenres = async () => {
  const { data: genres } = await axios.get(genresURL);
  return genres;
};

export const getGenre = async (genre_name) => {
  const { data: genre } = await axios.get(genreURL(genre_name));
  return genre;
};

export const getGenreGames = async (genre_name) => {
  const { data: games } = await axios.get(genreGamesURL(genre_name));
  return { list: games.results, next: games.next, count: games.count };
};
