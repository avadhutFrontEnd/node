// index.js
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // Validate
  const { error } = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) {
    // 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

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
    res.status(404).send("The course with the given ID was not found.");

  // Validate
  const { error } = validateCourse(req.body);
  // If invalid, return 400 - Bad request
  if (error) {
    // 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update course
  course.name = req.body.name;
  // Return the updated course
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
    res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  //   res.send(req.params.year);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
