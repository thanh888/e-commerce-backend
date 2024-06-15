const express = require("express");
const app = express();
const cookieParer = require("cookie-parser");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./src/routes/webs");
const bodyParser = require("body-parser");

const cors = require("cors");
dotenv.config();

app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  })
);
// app.use(cors());

const port = dotenv.PORT || 5000;

app.use(cookieParer());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB success");
  })
  .catch((err) => {
    console.log(err);
  });

routes(app);

app.listen(port, () => {
  console.log("server is running on port: ", port);
});
