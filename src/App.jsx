import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Watchlist from "./pages/Watchlist"
import { WatchlistProvider } from "./context/WatchlistContext"

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </WatchlistProvider>
  )
}

export default App
