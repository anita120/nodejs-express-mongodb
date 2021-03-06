const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const uri = process.env.MONGODB_URI;
const connectionstr = 'mongodb+srv://anita:welcome123@cluster0.0ezxs.mongodb.net/test_db?retryWrites=true&w=majority';
db.mongoose
  .connect(process.env.MONGODB_URI || connectionstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tutorial application." });
});

require("./app/routes/tutorial.routes")(app);

// set port, listen for requests
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});*/

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});