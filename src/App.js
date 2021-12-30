
import "./App.css";
import React, { useEffect, useState } from "react";
import logo from './assets/logo.svg'
import MovieCard from "./components/movieCard";
import MovieDetailContainer from "./components/movieDetailContainer";



function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(50);
  const [totalPosts, settotalPosts] = useState(0);
  const [state, setState] = useState(true);
  const [refresh, setRefresh] = useState(false)

  const url =
  "https://d3dyfaf3iutrxo.cloudfront.net/general/upload/8cc907c1bb9b404e8cb181825938fc23-data.json";

useEffect(() => {
  fetch(url, {
    "Access-Control-Allow-Origin": "https://localhost:3000",
  })
    .then((r) => r.json())
    .then((r) => {
      updateMovieList(r);
      settotalPosts(r.length);
    });
}, [refresh]);

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
}
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts =
  movieList && movieList.slice(indexOfFirstPost, indexOfLastPost);

useEffect(() => {
}, [state])

const selectMovie = (movie)=>{
setSelectedMovie(movie)
}

useEffect(() => {
updateMovieList((movieList) =>
    movieList.filter((x) => x.Title.includes(searchQuery))
  );
}, [searchQuery])

const onTextChange = (e) => {
  updateSearchQuery(e.target.value);
  setSelectedMovie({})
  console.log("called")
  
}
const clearSlectedMovie = ()=>{
  setSelectedMovie({})
}



const sortByTitle = ()=>{
movieList.sort(function(a, b) {
  return a.Title.localeCompare(b.Title)
});
setState(!state)
}
const sortByIMDB = ()=>{
movieList.sort(function(a, b) {
  return b.imdbRating.localeCompare(a.imdbRating)
});
console.log(movieList)
setState(!state)
}
console.log(selectedMovie)
const sortByYear = ()=>{
movieList.sort(function(a, b) {
  return a.Year.localeCompare(b.Year)
});
setState(!state)
}
console.log(Object.keys(selectedMovie).length)
  return(
    <div className="container">
      <header className="header"> 
        <div className="title">
        {/* <img src={'../src/assets/movie-icon.svg'}   /> */}
          React Movie App
        </div>
        <div className="search-container">
          <input  value={searchQuery} className="inpt" placeholder="Search Movie" onChange={(e)=>onTextChange(e)} />
          {
            searchQuery.length> 0 ? <button onClick={() => {setRefresh(!refresh) ;updateSearchQuery('')}}>X</button> : null
          }
        </div>
      </header>
      <div className="btn-cont">
        <div>Sort:</div>
        <button className="srt-btn" onClick={sortByTitle}>Title</button>
        <button className="srt-btn" onClick={sortByYear}>Year</button>
        <button className="srt-btn" onClick={sortByIMDB}>imdb Rating</button>
      </div>
{      selectedMovie && Object.keys(selectedMovie) == 0 ? null : <MovieDetailContainer selectedMovie={selectedMovie} clearSlectedMovie={clearSlectedMovie}/>
}
    <div className="movie-container">
    {currentPosts && currentPosts.map((movie ,index)=>{
    return  <MovieCard key={index}  movie={movie} selectMovie={selectMovie}/>
      
    })}
    </div>
    <div className="divMAin">
        {pageNumbers.map((item, index) => {
          return (
            <button key={index} className="btn" onClick={() => paginate(item)}>
              {item}
            </button>
          );
        })}
      </div>

    </div>
  )
}

export default App;
