const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// * MongoDB Connection
const dbURL = "mongodb://0.0.0.0/Dionysus";
const options = {
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbURL, options).catch((err) => {
  console.log(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to DB");
});

const app = express();

const corsOption = {
  origin: ["http://localhost:5173", "http:"],
  optionSuccessStatus: 200,
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// * Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/auth", require("./src/routes/auth"));
app.use("/wish", require("./src/routes/wishlist"));

// * Default Route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// * Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
