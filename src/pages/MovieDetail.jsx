import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavIcon from "../assets/icons/FavIcon";
import VideoSection from "../components/VideoSection";
import { MovieContext } from "../context/MovieContext";
import { toastErrorNotify } from "../helper/ToastNotify";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState("");
  const [videoKey, setVideoKey] = useState("");
  const { addToFavorites } = useContext(MovieContext);
  const { id } = useParams();
  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
    budget,
    original_language,
    revenue,
    genres,
  } = movieDetails;

  const keysForFavorite = {title, poster_path, overview, vote_average, id}
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => toastErrorNotify(err.message));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      // .catch((err) => toastErrorNotify(err.message));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="md:container px-10 mx-auto py-5 min-h-[calc(100vh-116px)]">
      <h1 className="p-1 text-gray-900 dark:text-white text-center text-3xl">{title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="md:container flex justify-center px-10 ">
        <div className="relative flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-200 dark:bg-gray-400 shadow-lg ">
          <img
            className="w-3/4 m-auto lg:w-1/3 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <FavIcon
            fill="crimson"
            width="24"
            height="24"
            className="absolute top-1 right-1 rounded bg-transparent m-1 hover:blur-none blur-[2px] hover:cursor-pointer"
            onClick={() => addToFavorites(keysForFavorite)}
          />
          <div className="p-6 flex flex-col justify-between ">
            <div>
              <h5 className="text-gray-900 dark:text-white text-xl font-medium mb-2">
                Overview
              </h5>
              <p className="text-gray-700 dark:text-white text-base mb-4">
                {overview}
              </p>
            </div>
            <ul className="bg-gray-100 dark:bg-gray-400 rounded-lg border border-gray-400 dark:border-white text-gray-900 dark:text-white">
              {movieDetails && (
                <>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full rounded-t-lg">
                    {"Release Date : " + release_date}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Rate : " + vote_average?.toFixed(1)}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Total Vote : " + vote_count}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Original Language : " + original_language?.toUpperCase()}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Genres : " + genres?.map((item) => " " + item.name)}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Budget : " + budget}
                  </li>
                  <li className="px-6 py-2 border-b border-gray-400 dark:border-white w-full">
                    {"Revenue : " + revenue}
                  </li>
                </>
              )}
              <li className="px-6 py-2 border-gray-400 dark:border-white w-full rounded-t-lg">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
