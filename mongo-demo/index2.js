const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

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
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run();

// **************  #17-Updating-a-Document-Query-First_mp4_3m_35s
async function updateCourse(id) {
  // 1st Approach: Query First
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  // const course = await Course.find({ name: "Angular Course" });

  // If course doesn't exist, return
  if (!course) {
    console.log("Course not found");
    return;
  }

  course.isPublished = true;
  course.author = "Another Author";

  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  
  const result = await course.save();
  console.log(result);
}

updateCourse('5a6900fff467be65019a9001');



