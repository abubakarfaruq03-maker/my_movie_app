import express from "express"
import env from "dotenv";
import axios from "axios"

const router = express.Router();
router.get("/random", async (req, res) => {
    const {genreId} = req.query;
 try {
    const page = Math.floor(Math.random() * 10) + 1; 
   const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
    params: {
        api_key: process.env.MOVIE_API_KEY,
        with_genres: genreId, page, 
        sort_by: 'vote_average.desc',
          'vote_average.gte': 7,
          'vote_count.gte': 1000,
    }
   })
   const movies = response.data.results;
   const randomIndex = Math.floor(Math.random() * movies.length);
   const randomMovie = movies[randomIndex];
   res.json(randomMovie);
 } catch (error) {
    res.status(500).json({ error: "Failed to get movie" });
    
 }
});



export default router;
