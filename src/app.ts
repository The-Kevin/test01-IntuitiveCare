import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("running!");
});
