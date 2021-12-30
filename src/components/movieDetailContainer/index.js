import React from "react";
import "./movieDetailContainer.css";

function MovieDetailContainer({ selectedMovie,clearSlectedMovie }) {
  const { Poster, imdbRating, Title, Year,Language,Rated,Released,Runtime,Genre,Actors,Plot } = selectedMovie;
  console.log(selectedMovie);
  return (
    <div className="MovieDetailContainer">
      <img className="cover-img" src={Poster}></img>
      <div className="movie-info">
        <div>Title: <span>{Title}</span></div>
        <div>Year:<span>{Year}</span></div>
        <div>IMDB:<span>{imdbRating}</span></div>
        <div>Language:<span>{Language}</span></div>
        <div>Rated:<span>{Rated}</span> </div>
        <div>Released:<span>{Released}</span> </div>
        <div>Runtime: <span>{Runtime}</span></div>
        <div>Genre: <span>{Genre}</span></div>
        <div>Actors:<span>{Actors}</span> </div>
        <div>Plot:<span>{Plot}</span></div>
      </div>
      <button className="close" onClick={clearSlectedMovie}>Close</button>
    </div>
  );
}

export default MovieDetailContainer;
