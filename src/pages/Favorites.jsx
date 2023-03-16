import React, { useContext } from "react";
import RemoveIcon from "../assets/icons/RemoveIcon";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";

const Favorites = () => {
  const { favorites,removeFromFavorites } = useContext(MovieContext);
  return (
    <div className="min-h-[85vh]">
      <h1 className="flex items-center justify-center pt-5 text-2xl text-red-main dark:text-white">
        Your favourite movies
      </h1>
      <div className=" flex justify-center flex-wrap">
        {favorites.map((movie) => (
          <div className="relative">
            <MovieCard key={movie.id} {...movie} />
            <RemoveIcon fill="crimson" className="absolute top-6 left-6 blur-[2px] hover:blur-none hover:cursor-pointer"
            onClick={()=> removeFromFavorites(movie)}/>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Favorites;
