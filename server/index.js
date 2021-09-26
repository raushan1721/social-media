const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongodb connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });


app.use("/public",express.static(path.join(__dirname,'./src/uploads')));
const authRoutes = require("./src/routes/auth");
const postRoute=require("./src/routes/post")
const commentRoute = require("./src/routes/comment");

app.use("/api/", authRoutes);
app.use('/api/', postRoute);
app.use('/api/', commentRoute);
const PORT = process.env.PORT||2020;
app.listen(PORT, () => console.log("your port has been started on "+PORT))