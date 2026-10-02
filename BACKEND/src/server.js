import express from "express";
import "dotenv/config";
import postRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server runing on Port:${PORT}`);
  });
});
