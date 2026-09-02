# Film Searcher

A sleek, responsive web application built with React, Vite, and Tailwind CSS v4 that allows users to search, filter, and explore detailed information about movies, TV series, and episodes using the OMDb API.

---

## Features

- Search & Filtering: Search titles in real-time with filters for media type (Movie, Series, Episode) and release year.
- Pagination: Effortlessly browse through multi-page search results.
- Detailed Movie View: Access full plots, cast lists, ratings, runtime, genre tags, and high-resolution posters.
- Dark Mode: Built-in dark/light theme switcher powered by Tailwind CSS v4 custom variants.
- Skeleton Loading States: Skeleton components ensure a smooth, modern visual experience while data is being fetched.
- Fully Responsive: Optimized for desktop, tablet, and mobile screens.

---

## Tech Stack

- Frontend: React 19, React Router v7
- Styling: Tailwind CSS v4 (`@tailwindcss/vite`)
- Build Tool: Vite 8
- Data Source: [OMDb API](https://www.omdbapi.com/)
- Language: JavaScript / TypeScript

---

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/film-searcher.git
cd film-searcher
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (or update the existing one):

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

> Note: You can get a free API key from [OMDb API Key Request](https://www.omdbapi.com/apikey.aspx).

---

## Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode at `http://localhost:5173` |
| `npm run build` | Builds the app for production to the `dist` folder |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs ESLint to check for code issues |

---

## Project Structure

```text
film-searcher/
├── public/
├── src/
│   ├── components/       # Reusable components (MovieCard, SearchBar, Skeleton, ThemeToggle, etc.)
│   ├── data/             # Mock data / fallback data
│   ├── pages/            # Page components (Home, MovieDetails)
│   ├── services/         # API service functions (omdbApi.ts)
│   ├── types/            # TypeScript interfaces & types
│   ├── App.jsx           # Routing & Main Layout
│   ├── index.css         # Global styles & Tailwind CSS v4 setup
│   └── main.jsx          # App entry point
├── .env                  # Environment variables
├── package.json
└── vite.config.js
```

---

## License

This project is open source and available under the [MIT License](LICENSE).
