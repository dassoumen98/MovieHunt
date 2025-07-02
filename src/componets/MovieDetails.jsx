import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import noMovie from "../assets/no-movie.png";

const API_BASE_URL = "https://www.omdbapi.com/?";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetch(`${API_BASE_URL}apikey=${API_KEY}&i=${id}`);
        const data = await response.json();
        if (data.Response === "False") {
          setErrorMessage(data.Error);
          setMovie(null);
        } else {
          setMovie(data);
          console.log(data);
          
        }
      } catch (error) {
        setErrorMessage("Failed to load movie details.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="text-white min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 mb-6"
        >
          ← Go Back
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          movie && (
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : noMovie}
                alt={movie.Title}
                className="w-full md:w-1/3 rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
                <p className="text-gray-400 mb-4 italic">{movie.Plot}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
                  <p><span className="font-semibold">Rated:</span> {movie.Rated}</p>
                  <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
                  <p><span className="font-semibold">Released:</span> {movie.Released}</p>
                  <p><span className="font-semibold">Country:</span> {movie.Country}</p>
                  <p><span className="font-semibold">Language:</span> {movie.Language}</p>
                  <p><span className="font-semibold">Director:</span> {movie.Director}</p>
                  <p><span className="font-semibold">Writer:</span> {movie.Writer}</p>
                  <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                  <p><span className="font-semibold">Awards:</span> {movie.Awards}</p>
                </div>

                {/* Ratings */}
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Ratings</h2>
                  <ul className="space-y-1">
                    <li>⭐ IMDb: {movie.imdbRating}/10</li>
                    {movie.Ratings?.map((r, idx) => (
                      <li key={idx}>
                        
                        {r.Source === "Rotten Tomatoes" && `🍅 Rotten Tomatoes: ${r.Value}`}
                        {r.Source === "Metacritic" && `📊 Metacritic: ${r.Value}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}




// import React from 'react'
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import Spinner from './Spinner';
// import noMovie from "../assets/no-movie.png"; 

// const API_BASE_URL = "https://www.omdbapi.com/?";
// const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

// export default function MovieDetails() {
//   const navigate = useNavigate();
//    const {id} =useParams()
   

//   let[isLoading, setIsLoading]=useState(false)
//   let [movie ,setMovie] = useState([])
//   let [errorMessage ,setErrorMessage]= useState('')
 


//   async function  fetchMovieDetails(){
//     setIsLoading(true)
//     try {
//        const response = await fetch(`${API_BASE_URL}apikey=${API_KEY}&i=${id}`)
//        let data  = await response.json()
//        console.log(data);
       
//        if(data.Response === 'False'){
//         setErrorMessage(data.Error)
//         setMovie([])
//         return
//       }
//       setMovie(data)
       
//     } catch (error) {
//       setErrorMessage('Movie Details Not Found:'`${error}`)
      
//     }finally{
//       setIsLoading(false)

//     }
//   }

//   useEffect(()=>{
//     fetchMovieDetails()

//   },[id])
//   return (
//     <div className='text-white'>
   
//       <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
//       {isLoading?(
//         <div className="flex justify-center items-center py-4">
//             <Spinner />
//         </div>

//       ):errorMessage?(
//         <p className="text-red-500 text-center">{errorMessage}</p>
//       ):(
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Poster */}
//           <img
//             src={movie.Poster !== 'N/A' ? movie.Poster : noMovie }
//             alt="Avengers: Endgame"
//             className="w-full md:w-1/3 rounded-lg shadow-md"
//           />

//           {/* Movie Info */}
//           <div className="flex-1">
//             <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
//             <p className="text-gray-400 mb-4 italic">"After the devastating events of Infinity War..."</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
//               <p><span className="font-semibold">Rated:</span> {movie.Rated}</p>
//               <p><span className="font-semibold">Runtime:</span> 181 min</p>
//               <p><span className="font-semibold">Released:</span> 26 Apr 2019</p>
//               <p><span className="font-semibold">Box Office:</span> $858,373,000</p>
//               <p><span className="font-semibold">Country:</span> United States</p>
//               <p><span className="font-semibold">Language:</span> English, Japanese, Xhosa, German</p>
//               <p><span className="font-semibold">Director:</span> Anthony Russo, Joe Russo</p>
//               <p><span className="font-semibold">Writer:</span> Christopher Markus, Stephen McFeely, Stan Lee</p>
//               <p><span className="font-semibold">Actors:</span> Robert Downey Jr., Chris Evans, Mark Ruffalo</p>
//               <p><span className="font-semibold">Awards:</span> Nominated for 1 Oscar. 70 wins & 133 nominations</p>
//             </div>

//             {/* Ratings */}
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold mb-2">Ratings</h2>
//               <ul className="space-y-1">
//                 <li>⭐ IMDb: 8.4/10</li>
//                 <li>🍅 Rotten Tomatoes: 94%</li>
//                 <li>📊 Metacritic: 78/100</li>
//                 <li><button
//             onClick={() => navigate(-1)}
//             className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
//           >
//             ← Go Back
//           </button></li>
                
//               </ul>
//             </div>
//           </div>
//         </div>

//       )}
        
//       </div>

//     </div>
//   )
// }
