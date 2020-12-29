const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");
const tweets = require("./routes/api/tweets");
const passport = require("passport");



//starts an express server
const app = express();
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));


//adds middlewear to bodyparser?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

//routes
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//for local host and heroku
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

