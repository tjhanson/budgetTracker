const express = require('express');
const db = require("./schema");
const Role = db.role;
const bodyParser = require("body-parser")
const cors = require("cors")

const board = require('./routes/api/board');


const app = express();

//bodyparser middleware
app.use(bodyParser.json({limit: '20mb'}));
var corsOptions = {
  origin: "http://127.0.0.1:8081/"
};
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const user = require('./routes/api/users')(app);
const auth = require('./routes/api/auth')(app);
const url = "mongodb://127.0.0.1:27017/FuscoeTasks";
db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


app.use('/board',board)
//app.use('/users',user)
//app.use('/auth',auth)


const port =  process.env.PORT || 8080;

app.listen(port, () => console.log(`server started on port ${port}`))