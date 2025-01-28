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

async function createCourse() {
  const course = new Course({
    // we pass an "object" to initialize our "course" object
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  const courses = await Course
    .find({ author: "Mosh", isPublished: true })
    // .find({ price: 10 })
    // *********** Comparison Operators :
    // .find({ price: { $gt: 10 } })
    // .find({ price: { $gte: 10, $lte: 20 } })\
    // .find({ price: { $in: [10, 15, 20] } })
    // *********** Logical Query Operators :
    // or
    // and
    // .find()
    // .or([{ author: "Mosh" }, { isPublished: true }])
    // .and([ ])
    // *********** Regular Expressions :
    // -----> get courses whose author Starts with Mosh
    // .find({ author: /^Mosh/ })
    // -----> get courses whose author Ends with Hamedani
    // .find({ author: /Hamedani$/ }) // <-- case sensitive
    // .find({ author: /Hamedani$/i }) // <-- case In-sensitive
    // -----> get courses whose author contains the word Mosh
    // .find({ author: /.*Mosh.*/ }) // <-- case sensitive
    // .find({ author: /.*Mosh.*/i }) // <-- case In-sensitive
    // *********** Pagination :
    .skip((pageNumber - 1) * pageSize)
    // .limit(10)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // .countDocuments();
  console.log(courses);
}

// getCourses();



// **************  #17-Updating-a-Document-Query-First_mp4_3m_35s
async function updateCourse(id) {
  // 1st Approach: Query First
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });

  const result = await course.save();
  console.log(result);
}

updateCourse('67944c5e8849f9de893ad160');








