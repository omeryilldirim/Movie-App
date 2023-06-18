import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FavIcon from "../assets/icons/FavIcon";
import { AuthContext } from "../context/AuthContext";
import { MovieContext } from "../context/MovieContext";
import { toastWarnNotify } from "../helper/ToastNotify";

const MovieCard = (props) => {
  const { title, poster_path, overview, vote_average, id } = props;
  const { currentUser } = useContext(AuthContext);
  const { addToFavorites } = useContext(MovieContext);
  const navigate = useNavigate();
  const getVoteClass = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  const goToDetailPage = () => {
    navigate("/details/" + id);
    currentUser || toastWarnNotify("Please login to see movie details!");
  };

  return (
    <div className="movie relative" id="container">
      <img
        loading="lazy"
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt="movie-card"
        onClick={goToDetailPage}
      />
      <FavIcon
        fill="crimson"
        width="24"
        height="24"
        className="absolute top-1 right-1 rounded bg-transparent m-1 hover:blur-none blur-[2px]"
        onClick={() => {
          if (currentUser) {
            addToFavorites(props);
          } else {
            toastWarnNotify("Please login to see your favourites list!");
            addToFavorites(props);
          }
        }}
      />

      <div
        className="flex align-baseline justify-between p-1 text-white"
        onClick={goToDetailPage}
      >
        <h5>{title}</h5>
        {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="movie-over" onClick={goToDetailPage}>
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
