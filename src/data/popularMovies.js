export const popularMovieIds = [
  // Page 1 (Top 10 Classics & Blockbusters)
  "tt1375666", // Inception (2010)
  "tt0816692", // Interstellar (2014)
  "tt0468569", // The Dark Knight (2008)
  "tt0133093", // The Matrix (1999)
  "tt0499549", // Avatar (2009)
  "tt4154796", // Avengers: Endgame (2019)
  "tt0120338", // Titanic (1997)
  "tt0172495", // Gladiator (2000)
  "tt0111161", // The Shawshank Redemption (1994)
  "tt0108052", // Schindler's List (1993)

  // Page 2 (Sci-Fi & Epic Cinema)
  "tt15398776", // Oppenheimer (2023)
  "tt1160419",  // Dune: Part One (2021)
  "tt15239678", // Dune: Part Two (2024)
  "tt0110912",  // Pulp Fiction (1994)
  "tt0137523",  // Fight Club (1999)
  "tt0109830",  // Forrest Gump (1994)
  "tt0120737",  // Lord of the Rings: Fellowship of the Ring (2001)
  "tt0167260",  // Lord of the Rings: Return of the King (2003)
  "tt4633694",  // Spider-Man: Into the Spider-Verse (2018)
  "tt0088763",  // Back to the Future (1985)

  // Page 3 (Must-Watch Hits & Animation)
  "tt0107290",  // Jurassic Park (1993)
  "tt0076759",  // Star Wars: Episode IV - A New Hope (1977)
  "tt0068646",  // The Godfather (1972)
  "tt0245429",  // Spirited Away (2001)
  "tt0110357",  // The Lion King (1994)
  "tt2582802",  // Whiplash (2014)
  "tt0102926",  // The Silence of the Lambs (1991)
  "tt0848228",  // The Avengers (2012)
  "tt1877830",  // The Batman (2022)
  "tt0993846",  // The Wolf of Wall Street (2013)

  // Page 4 (Modern Legends & Thrillers)
  "tt6751668",  // Parasite (2019)
  "tt10872600", // Spider-Man: No Way Home (2021)
  "tt1630029",  // Avatar: The Way of Water (2022)
  "tt1745960",  // Top Gun: Maverick (2022)
  "tt2084970",  // The Imitation Game (2014)
  "tt0114709",  // Toy Story (1995)
  "tt0435705",  // Wall-E (2008)
  "tt0209144",  // Memento (2000)
  "tt0371746",  // Iron Man (2008)
  "tt0120815",  // Saving Private Ryan (1998)

  // Page 5 (All-Time Favorites)
  "tt0079588",  // Alien (1979)
  "tt0082971",  // Raiders of the Lost Ark (1981)
  "tt0103064",  // Terminator 2: Judgment Day (1991)
  "tt0080684",  // Star Wars: Episode V - Empire Strikes Back (1980)
  "tt0114369",  // Se7en (1995)
  "tt0368226",  // The Prestige (2006)
  "tt0120689",  // The Green Mile (1999)
  "tt0898266",  // The Big Bang Theory (2007)
  "tt0110413",  // Leon: The Professional (1994)
  "tt0099685",  // Goodfellas (1990)
]

export const fallbackKeywords = [
  "marvel",
  "batman",
  "star wars",
  "spiderman",
  "avengers",
  "harry potter",
  "disney",
  "pixar",
]

export function getPopularIdsBatch(page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize
  return popularMovieIds.slice(start, start + pageSize)
}
