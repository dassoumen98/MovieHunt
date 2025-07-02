import React from 'react'
import noMovie from "../assets/no-movie.png"; 
import { Link } from 'react-router-dom';


export default function MovieCard({movie:{Poster,Title,Type,Year,imdbID}}) {
  return (
    <div className='movie-card'>
        <img src={Poster !== 'N/A' ? Poster : noMovie} alt={Title}/>

        <div className="mt-4">
            <h3 >{Title}</h3>
    
        </div>
        
       

      

        <div className="content ">
            <p className='text-white'>{Type}</p>
            <span className='text-yellow-500'>•</span>
            <p className='text-white'>Year:{Year ? Year : 'N/A'}</p>
            
      

      <Link
        to={`/movie/${imdbID}`}
        className="bg-blue-500 text-white rounded p-1  inline-block"
      >
        Details
      </Link>
      
            
        </div>

      
              
      
            
      
      
    </div>
  )
}
