import React, { useEffect, useState } from "react";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // function fetchMoviesHandler() {
  //   fetch("https://swapi.dev/api/films/")
  //   .then(res => {
  //     return res.json()
  //   }).then(data => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })
  //     setMovies(transformedMovies);
  //   });
  // }

  async function fetchMoviesHandler() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://https-get-post-reactjs-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseData: data[key].releaseData,
        });
      }

      setMovies(loadedMovies);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      return console.log("We do cleanup here");
    }
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  async function addMovieHandler(movie) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://https-get-post-reactjs-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if(!response.ok) {
        throw new Error("There was an error");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false);
      return console.log("We do cleanup here");
    }
  }

  let content = <h2>No movie were found</h2>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (loading) {
    content = <h2>Loading...</h2>;
  }

  if (movies.length === 0) {
    content = error;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {loading && <h2>Loading...</h2>}
        {movies.length === 0 && error}
        {movies.length === 0 && error && <h2>No movie were found</h2>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
