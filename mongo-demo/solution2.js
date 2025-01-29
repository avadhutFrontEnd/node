const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

// Create Schema :
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// Create a Model :
const Course = mongoose.model("Course", courseSchema);

// we have a "Model" use this to Query our "Courses" :
async function getCourses() {
  return await Course
    // .find({
    //   isPublished: true,
    //   tags: { $in: ["frontend", "backend"] },
    // })
    .find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    // .sort({ price: -1 })
    .sort("-price")
    // .select({ name: 1, author: 1 });
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
