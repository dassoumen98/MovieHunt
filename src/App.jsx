import { useEffect, useState } from "react"
import Search from "./componets/Search"
import Spinner from "./componets/Spinner";
import MovieCard from "./componets/MovieCard";
import { useDebounce } from "react-use";

// import './App.css'

const API_BASE_URL ='https://www.omdbapi.com/?'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
console.log(API_KEY);





function App() {
  let [searchTerm , setSearchTerm]= useState("")
  let[errorMessage, setErrorMessage] = useState("")
  let [movieList , setMovieList]= useState([])
  console.log(movieList);
  let[isLoading, setIsLoading]=useState(false)
  let [debouncesearchTerm , setDebounceSearchTerm] = useState('')
  console.log(debouncesearchTerm);
  
 
  useDebounce(()=> setDebounceSearchTerm(searchTerm) , 500 ,[searchTerm])

  // fetch Movies 
  const  fetchMovies = async (query ='')=>{
    setIsLoading(true)
    setErrorMessage('')
    try {
      let endpoint = query?`${API_BASE_URL}apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      :`${API_BASE_URL}apikey=${API_KEY}&s=Singham`
      let response = await fetch(endpoint)

      if(!response.ok){
        throw new Error("failed to fetch movies")
      }

      let data  =await response.json()
      console.log(data);

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch Movies')
        setMovieList([])
        return
      }

      // data fetechd sucessfully and response is true
      setMovieList(data.Search || [])
      

     
      
    } catch (error) {
      setErrorMessage("please try a vaild movie")
      
    }finally{
      setIsLoading(false)
      
    }

   
};





  useEffect(()=>{
    fetchMovies(debouncesearchTerm)

  }, [debouncesearchTerm])
  
  

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
        <img src="./src/assets/hero.png" alt="hero banner" />
          <h1 >Find <span className="text-gradient"> Movies</span> You'll Enjoy Without the Hassle</h1>
        {/* search */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
      
         {/* main body part  */}
        <section className="all-movies mt-[40px]">
        <h2 className="text-center">All Movies</h2>

        {isLoading ? (
          
         <div className="flex justify-center items-center py-4">
            <Spinner />
        </div>
        ):errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : ( 
          <ul>
            {movieList.map((movie)=>(
              <MovieCard  key ={movie.imdbID} movie={movie}/>
            ))}
          </ul>
        )}

        </section>

      </div> 
    </main> 
  )
}

export default App
