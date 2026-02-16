import express from "express"
import env from "dotenv";
import cors from "cors"
import genreRouter from "./Router/genre.js";
import movieRouter from "./Router/movie.js";
const app = express();
const port = 3000;
env.config()
app.use(cors())
const mainRouter = express.Router();


mainRouter.use("/genre", genreRouter);
mainRouter.use("/movie", movieRouter);

app.use("/api", mainRouter);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
