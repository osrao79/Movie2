import React from 'react'
import './movieCard.css'


const MovieCard = ({movie, selectMovie})=> {
    const { Title, Year, imdbID, Type, Poster } =movie;
    return (
<div className='movie-card' onClick={()=>selectMovie(movie)}>
          <img className='movie-cover' src={Poster} />
          <div className='movie-name'>{Title}</div>
          <div className='movie-info'>
              <div className='info'>{Type}</div>
              <div className='info'>{Year}</div>
          </div>
        </div>
    )
}

export default MovieCard
