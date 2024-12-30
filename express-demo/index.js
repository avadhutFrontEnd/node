// index.js
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // default

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

// Built-in Middleware Functions :
// 1st :
app.use(express.json());
// 2nd :
app.use(express.urlencoded({ extended: true })); // key=value&key=value
// 3rd :
app.use(express.static("public"));

// Third-party-Middleware Functions :
// 1st :
app.use(helmet());
// 2nd :
app.use(morgan("tiny"));

app.use("/api/courses", courses);
app.use("/", home);

// Configuration
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
console.log(`Mail Password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// DB work...
dbDebugger("Connected to the database");

// Custom-Middleware Functions :
app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

// app.get()
// app.post()
// app.put()
// app.delete()

// ************ Define a Route ************
// app.get("/api/posts/:year/:month", (req, res) => {
//   //   res.send(req.params.year);
//   res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
