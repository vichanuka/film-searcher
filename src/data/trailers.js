export const popularTrailerMap = {
  "tt1375666": "YoHD9XEInc0", // Inception
  "tt0816692": "zSWdZVtXT7E", // Interstellar
  "tt0468569": "EXeTwQWrcwY", // The Dark Knight
  "tt0133093": "vKQi3bBA1y8", // The Matrix
  "tt0499549": "5PSNL1qE6VY", // Avatar
  "tt4154796": "TcMBFSGVi1c", // Avengers: Endgame
  "tt0120338": "cH6kGZKV3A4", // Titanic
  "tt0172495": "owK1qxDselE", // Gladiator
  "tt0111161": "PLl99DvZ6t4", // The Shawshank Redemption
  "tt0108052": "gG22XNhtnoY", // Schindler's List
  "tt15398776": "uYPbbksJxIg", // Oppenheimer
  "tt1160419": "n9xhJrPfy4s",  // Dune Part 1
  "tt15239678": "Way9Dexny3w", // Dune Part 2
  "tt0110912": "s7EdQ4FqbhY",  // Pulp Fiction
  "tt0137523": "qtRKdVHc-cE",  // Fight Club
  "tt0109830": "bLvqoHBptjg",  // Forrest Gump
  "tt0120737": "V75dMMIW2B4",  // LOTR Fellowship
  "tt0167260": "r5X-hFf6Bwo",  // LOTR Return of the King
  "tt4633694": "g4Hbz2jLXvQ",  // Spider-Verse
  "tt0088763": "qvsgGtivCgs",  // Back to the Future
  "tt0107290": "lc0UehYemQA",  // Jurassic Park
  "tt0076759": "vZ734NWnAHA",  // Star Wars A New Hope
  "tt0068646": "UaVTIH8mujA",  // The Godfather
  "tt0245429": "ByXuk9QqQkk",  // Spirited Away
  "tt0110357": "7TavVZMewpY",  // The Lion King
  "tt2582802": "7d_jQycdQGo",  // Whiplash
  "tt0102926": "W6Mm8Sbe__o",  // Silence of the Lambs
  "tt0848228": "eOrNlmT9364",  // The Avengers
  "tt1877830": "mqqft2x_Aa4",  // The Batman
  "tt0993846": "iszwuX1AK6A",  // Wolf of Wall Street
  "tt6751668": "5xH0HfJHsaY",  // Parasite
  "tt10872600": "JfVOs4VSpmA", // Spider-Man No Way Home
  "tt1630029": "d9MyW72ELq0",  // Avatar Way of Water
  "tt1745960": "qSqVVqua428",  // Top Gun Maverick
  "tt2084970": "nuPZUUED5uk",  // The Imitation Game
  "tt0114709": "v-PjgYDrg70",  // Toy Story
  "tt0435705": "alIq_wG9FNk",  // Wall-E
  "tt0209144": "4CV41hoyS8A",  // Memento
  "tt0371746": "8ugaeA-nMTc",  // Iron Man
  "tt0120815": "zwhP5b4tD6g",  // Saving Private Ryan
  "tt0079588": "LjLamj-_yM",   // Alien
  "tt0082971": "XkkZHPw4A3E",  // Raiders of the Lost Ark
  "tt0103064": "CRRlbK5w8AE",  // Terminator 2
  "tt0080684": "JNwNXF9Y6kY",  // Star Wars Empire
  "tt0114369": "znmZoVkCoci",  // Se7en
  "tt0368226": "o4gHCmTQDgA",  // The Prestige
  "tt0120689": "Ki4haFrqSrw",  // The Green Mile
  "tt0898266": "WBb35lVRzOo",  // Big Bang Theory
}

export function getTrailerVideoId(imdbID) {
  return popularTrailerMap[imdbID] || null
}
