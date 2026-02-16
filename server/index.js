import express from "express";
import env from "dotenv";
import cors from "cors";
import genreRouter from "./Router/genre.js";
import movieRouter from "./Router/movie.js";

env.config();

const app = express();
app.use(cors());
app.use(express.json()); 


app.use("/api/genre", genreRouter);
app.use("/api/movie", movieRouter);


const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

export default app;