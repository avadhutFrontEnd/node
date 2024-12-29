// index.js
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const logger = require("./logger");
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default


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

// Configuration
console.log(`Application Name: ${config.get('name')}`); 
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

// DB work...
dbDebugger('Connected to the database');


// Custom-Middleware Functions :
app.use(logger);

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// app.get()
// app.post()
// app.put()
// app.delete()

// ************ Define a Route ************
app.get("/", (req, res) => {
  res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // Validate
  const { error } = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Validate
  const { error } = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // Not existing, return 404
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  //   res.send(req.params.year);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
