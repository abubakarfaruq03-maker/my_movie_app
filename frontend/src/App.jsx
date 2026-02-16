import { useState } from 'react'
import axios from 'axios'
import Button from './button'
const API_URL = import.meta.env.VITE_API_BASE_URL;


function App() {

  const [genres, setGenre] = useState([])
  const [error, setError] = useState('')
  const [Loading, setLoading] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [clickedGenre, setClickedGenre] = useState(null)
  const [movie, setMovie] = useState([])
  const [showMovie, setShowMovie] = useState(false)
  const [get, setGet] = useState("")




  const getGenres = async () => {

    try {
      setLoading(true)
      setGet("genres")
      setError("")
      const result = await axios.get(`${API_URL}/genre`)
      console.log(result.data)
      setGenre(result.data)

    } catch (err) {
      console.error("Error fetching genres:", err.response?.data || err.message);
      setError("Unable to fetch genres, Please try again")
    } finally {
      setLoading(false)
    }
  }
  function handleResetGenres() {
    setShowMovie(false)
    setSelectedGenre(null)
    setClickedGenre(null)
    setMovie(null)
  }


  function handleGenreSelect(genre) {
    setClickedGenre(genre.id)
    setTimeout(() => {
      setSelectedGenre(genre.id)
      setClickedGenre(null)
    }, 800)
  }

  const getMovie = async () => {
    try {
      setShowMovie(false)
      setLoading(true)
      setGet("movie")
      setError("")
      const result = await axios.get(`${API_URL}/movie/random`, {
        params: { genreId: selectedGenre }
      })
      console.log(result.data)
      setMovie(result.data)
      setShowMovie(true)

    } catch (error) {
      console.error("Error fetching movie:", error.response?.data || error.message);
      setError("Unable to get movie, Please try again")

    }
    finally {
      setLoading(false)
    }


  }
  return (

    <div className="relative w-screen min-h-screen bg-black/40 
     before:content-[''] before:absolute before:inset-0 
     before:bg-[url('/images/movie.jpg')] before:bg-cover before:bg-center before:bg-no-repeat before:z-[-1]">


      <div className='flex justify-start items-center flex-col gap-20  '>
        <h1 className='text-red-800 text-5xl font-bold mt-40' >
          Welcome
        </h1>
        {!genres.length && !Loading && (

          <Button text="Select a genre" onClick={getGenres} variant='secondary' />


        )}

      </div>
      {Loading && (
        <div className="flex justify-center items-center gap-3 mt-6 text-white">
          <div className="w-5 h-5 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
          <span>Getting {get}...</span>
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center mt-6'>
          <p className='text-red-500 font-bold'>{error}</p>
        </div>
      )}
      {selectedGenre && !showMovie && (
        <div className='flex justify-center items-center mt-20 '>

          <Button text="Get Random Movie" onClick={getMovie} variant='secondary' />
        </div>
      )}

      {!Loading && genres.length > 0 && !selectedGenre && (
        <div className='mt-16 ml-4 sm:ml-36 grid grid-cols-4 gap-4 sm:gap-8'>
          {genres.map(genre => (
            <div
              key={genre.id}
              onClick={() => handleGenreSelect(genre)}
              className={`
    w-17 h-18 flex justify-center items-center p-4 rounded-2xl text-[12px]
    transition-all duration-300 ease-in-out cursor-pointer
    ${clickedGenre === genre.id ? 'bg-white text-red-800' : 'bg-red-800 text-white'}
    hover:bg-white hover:text-red-800
  `}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )
      }

      {showMovie && movie && (
        <div className='flex flex-col justify-center items-center mt-10'>
          <div className='w-50 h-50 rounded-2xl bg-white'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-50 h-50 object-cover rounded-2xl"
            />
          </div>
          <div className='text-center sm:w-150 '>
            <p className='font-bold text-[1.5rem] text-white mt-3'>{movie.title}</p>
            <p className='font-bold text-white mt-3'>{movie.overview}</p>
            <div className='flex flex-col justify-center items-center gap-2'
            >

              <Button text="Get Another Movie" onClick={getMovie} variant='secondary' className='mt-5' />

              {selectedGenre && showMovie && (

                <Button text="Get Genre" onClick={handleResetGenres} variant='primary' className='mt-5' />


              )}
            </div>

          </div>
        </div>
      )}


    </div>
  )
}

export default App
