const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const route = require("./Router/routes")
const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    'mongodb+srv://Kaustubh-db:Bs9axX3hjg0bR120@cluster0.su9ki.mongodb.net/Project2-intern',
    {
      useNewUrlParser: true,
    }
  )
  .then(() =>
    console.log("MongoDb is connected")
  )
  .catch((err) => console.log(err));

  app.use("/", route);

  app.listen(process.env.PORT || 3000, function () {
    console.log("Express app running on port " + (process.env.PORT || 3000));
  });


