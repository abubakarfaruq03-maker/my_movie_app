import express from "express"
import env from "dotenv";
import axios from "axios"

const router = express.Router();
router.get("/", async (req, res) => {
 try {
   const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
    params: {
        api_key: process.env.MOVIE_API_KEY,
    }
   })
   res.json(response.data.genres);
 } catch (error) {
    res.status(500).json({ error: "Unable to fetch genres" });
    
 }
});



export default router;
