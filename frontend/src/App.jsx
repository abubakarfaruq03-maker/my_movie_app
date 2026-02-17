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
  const [movie, setMovie] = useState(null)
  const [showMovie, setShowMovie] = useState(false)
  const [get, setGet] = useState("")
  const [header, setHeader] = useState("Welcome")

  // FETCH GENRES
  const getGenres = async () => {
    try {
      setLoading(true)
      setGet("genres")
      setError("")
      const result = await axios.get(`${API_URL}/genre`)

      if (result.data && Array.isArray(result.data)) {
        setGenre(result.data)
      } else {
        setGenre([])
        setError("The server sent back an invalid format.")
      }
    } catch (err) {
      console.error("Error fetching genres:", err.response?.data || err.message);
      setGenre([])
      setError("Unable to fetch genres. Please try again.")
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

  // SELECT GENRE
  function handleGenreSelect(genre) {
    setClickedGenre(genre.id)
    setTimeout(() => {
      setSelectedGenre(genre.id)
      setClickedGenre(null)
    }, 800)
  }

  // FETCH RANDOM MOVIE
  const getMovie = async () => {
    try {
      setShowMovie(false)
      setLoading(true)
      setGet("movie")
      setError("")
      const result = await axios.get(`${API_URL}/movie/random`, {
        params: { genreId: selectedGenre }
      })
      setMovie(result.data)
      setShowMovie(true)
    } catch (error) {
      console.error("Error fetching movie:", error.response?.data || error.message);
      setError("Unable to get movie. Please try again.")
    } finally {
      setLoading(false)
      setHeader("Your Movie")
    }
  }

  return (
    <div className="relative w-screen min-h-screen bg-black/40 
      before:content-[''] before:absolute before:inset-0 
      before:bg-[url('/images/movie.jpg')] before:bg-cover before:bg-center before:bg-no-repeat before:z-[-1]">

      {/* HEADER SECTION */}
      <div className='flex justify-start items-center flex-col gap-20'>
        <h1 className='text-red-800 text-5xl font-bold mt-40'>
          {header}
        </h1>
        {(!genres || genres.length === 0) && !Loading && (
          <Button text="Select a genre" onClick={getGenres} variant='secondary' />
        )}
      </div>

      {/* STATUS INDICATORS (Loading / Error) */}
      {Loading && (
        <div className="flex justify-center items-center gap-3 mt-6 text-white">
          <div className="w-5 h-5 border-2 border-red-700 border-t-transparent rounded-full animate-spin" />
          <span>Getting {get}...</span>
        </div>
      )}

      {error && (
        <div className='flex justify-center items-center mt-6'>
          <p className='text-red-500 font-bold bg-black/60 px-4 py-2 rounded-lg'>{error}</p>
        </div>
      )}

      {/* GENRE SELECTION VIEW */}
      {selectedGenre && !showMovie && !Loading && (
        <div className='flex justify-center items-center mt-20 '>
          <Button text="Get Random Movie" onClick={getMovie} variant='secondary' />
        </div>
      )}

      {!Loading && Array.isArray(genres) && genres.length > 0 && !selectedGenre && (
        <div className='mt-16 px-4 sm:px-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto'>
          {genres.map(genre => (
            <div
              key={genre.id}
              onClick={() => handleGenreSelect(genre)}
              className={`
                h-16 flex justify-center items-center p-4 rounded-2xl text-[14px] font-semibold
                transition-all duration-300 ease-in-out cursor-pointer text-center
                ${clickedGenre === genre.id ? 'bg-white text-red-800 scale-95' : 'bg-red-800 text-white'}
                hover:bg-white hover:text-red-800
              `}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}

      {/* MOVIE DISPLAY VIEW */}
      {showMovie && movie && (
        <div className='flex flex-col justify-center items-center mt-10 pb-10 px-4'>
        
          <div className='w-64 h-96 rounded-2xl bg-gray-800 shadow-2xl overflow-hidden'>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">No Poster</div>
            )}
          </div>

          <div className='text-center mt-6 max-w-2xl bg-black/60 p-6 rounded-3xl'>
            <h2 className='font-bold text-3xl text-white mb-3'>{movie.title}</h2>
            <p className='text-white leading-relaxed mb-6'>{movie.overview}</p>

            <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
              <Button text="Get Another Movie" onClick={getMovie} variant='secondary' />
              <Button text="Change Genre" onClick={handleResetGenres} variant='primary' />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App