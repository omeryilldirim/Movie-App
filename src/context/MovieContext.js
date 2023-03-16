import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";
export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || [])

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)) 
  }, [favorites])
  
  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => toastErrorNotify(err.message))
      .finally(() => setLoading(false));
  };

  const addToFavorites = (movie) =>{
    const filteredList = favorites.filter((item)=>item.id === movie.id)
    if(filteredList.length){
      toastWarnNotify("This movie is already in your favourites!")
    } else{
      setFavorites([...favorites, {...movie}])
      toastSuccessNotify("Added to your favorites")
    }
  }

  const removeFromFavorites = (movie) => {
    const newFavorites = favorites.filter((item)=>item.id !== movie.id)
    setFavorites(newFavorites)
    toastSuccessNotify("Removed from favourites")
  }
  const values = { movies, getMovies, loading,favorites,addToFavorites,
  removeFromFavorites };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};

export default MovieContextProvider;
