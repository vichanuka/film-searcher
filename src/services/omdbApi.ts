import type { MovieSearchResponse } from "../types/movie"

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = "https://www.omdbapi.com/"

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<MovieSearchResponse> {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}&page=${page}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  const data: MovieSearchResponse = await response.json()

  return data
}

export async function getMovieDetails(id: string) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  const data = await response.json()

  return data
}

