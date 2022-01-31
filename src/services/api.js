import date from 'date-and-time'
const keyURL = `?key=88d7f6189de346469853366e6a4d8eb0`
// const keyURL = `?key=08d27c6bb0834ec9b909740150da5459`;
// free : 831b0ac41fcf475b91b051ac7b97e9c3

// Base URLs
const games_URL = 'https://api.rawg.io/api/games'
const genres_URL = 'https://api.rawg.io/api/genres'
const platforms_URL = 'https://api.rawg.io/api/platforms'

// Getting the date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1
  if (month < 10) return `0${month}`
  return month
}
const getLastMonth = () => {
  const month = new Date().getMonth()
  if (month < 10) return `0${month}`
  else return month
}
const getCurrentDay = () => {
  const day = new Date().getDate()
  if (day < 10) return `0${day}`
  else return day
}

// Dates
const currentYear = new Date().getFullYear()
const currentMonth = getCurrentMonth()
const currentDay = getCurrentDay()
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`
const lastWeek = date.format(
  date.addDays(date.parse(`${currentDate}`, 'YYYY-MM-DD'), -7),
  'YYYY-MM-DD'
)
const nextWeek = date.format(
  date.addDays(date.parse(`${currentDate}`, 'YYYY-MM-DD'), 7),
  'YYYY-MM-DD'
)
const lastMonth = date.format(
  date.addDays(date.parse(`${currentDate}`, 'YYYY-MM-DD'), -30),
  'YYYY-MM-DD'
)
// const lastWeek = date.addDays(
//   date.format(new Date(currentDate), "YYYY,MM,DD"),
//   -7
// );
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`
const next2Years = `${currentYear + 2}-${currentMonth}-${currentDay}`
const popular_last_year = `${keyURL}&dates=${lastYear},${currentDate}&ordering=-added&page_size=10`
const popular_this_year = `${keyURL}&dates=2021-01-01,${currentDate}&ordering=-added&page_size=10`
const new_last_month = `${keyURL}&ordering=popularity&dates=${lastMonth}
,${currentDate}`
const upcoming_games = `${keyURL}&dates=${currentDate},${next2Years}&ordering=-popularity&page_size=10`

// Final URLs
const popular = {
  lastYear: `${games_URL}${popular_last_year}`,
  thisYear: `${games_URL}${popular_this_year}`,
}
const newGames = {
  lastMonth: `${games_URL}${new_last_month}`,
}
const upcomingGamesURL_2Years = `${games_URL}${upcoming_games}`
const gameDetailsURL = (game_id) => `${games_URL}/${game_id}${keyURL}`
const gameScreenshotsURL = (game_id) =>
  `${games_URL}/${game_id}/screenshots${keyURL}`
const searchGameURL = (game_name, size) =>
  `${games_URL}${keyURL}&search=${game_name}&page_size=${size}`
const allGamesURL = `${games_URL}${keyURL}`
const trendingURL = `${games_URL}${keyURL}&dates=2021-01-01,2023-01-01`
const nextWeekURL = `${games_URL}${keyURL}&dates=${currentDate},${nextWeek}`
const thisWeekURL = `${games_URL}${keyURL}&dates=${lastWeek},${currentDate}`
const storesURL = (game_id) => `${games_URL}/${game_id}/stores${keyURL}`
const genresURL = `${genres_URL}${keyURL}`
const genreURL = (genre) => `${genres_URL}/${genre}${keyURL}`
const genreGamesURL = (genre) => `${allGamesURL}&genres=${genre}&page_size=10`
const platformsURL = `${platforms_URL}${keyURL}`
const platformURL = (platform) => `${platforms_URL}/${platform}${keyURL}`
const platformGamesURL = (platform) => `${allGamesURL}&platforms=`

// Export
export {
  popular,
  newGames,
  upcomingGamesURL_2Years,
  gameDetailsURL,
  gameScreenshotsURL,
  searchGameURL,
  allGamesURL,
  trendingURL,
  thisWeekURL,
  nextWeekURL,
  storesURL,
  genresURL,
  genreURL,
  genreGamesURL,
  platformsURL,
  platformURL,
}
