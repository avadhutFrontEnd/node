const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// once we have a "schema", we need to compile that into a "model", which gives us a "Class" :
const Course = mongoose.model("course", courseSchema);
// Next, we can create an "object" based on that "Class" and this "object" maps to a "document" in a MongoDB database
const course = new Course({
  // we pass an "object" to initialize our "course" object
  name: "Node.js Course",
  author: "Mosh",
  tags: ["node", "backend"],
  isPublished: true
});
