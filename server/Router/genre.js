import express from "express"
import axios from "axios"

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!process.env.MOVIE_API_KEY) {
      console.error("Missing MOVIE_API_KEY in environment variables");
      return res.status(500).json([]); 
    }

    const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: process.env.MOVIE_API_KEY,
      }
    });

    res.json(response.data.genres || []); 

  } catch (error) {
    console.error("TMDB Error:", error.response?.data || error.message);
    res.status(500).json([]); 
  }
});

export default router;