import express from "express";
import cors from "cors";
import authRouter from "./routes/admin.route.js";
import skRouter from "./routes/sk.route.js";
import wtRouter from "./routes/wt.route.js";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", skRouter);
app.use("/api", wtRouter);

app.get("/test", (req, res) => {
  res.send("ABC");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
