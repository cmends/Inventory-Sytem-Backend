import express from "express";
import routsApi from "./routes/index.js";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Failed to connect to db:", error.message);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Inventory backend is running");
});

app.use(routsApi);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
