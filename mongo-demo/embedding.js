const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    // author: authorSchema, // Use the authorSchema directly instead of redefining the structure
    author: {
      type: authorSchema,
      required: true,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author: {
      name: author.name,
      bio: author.bio || "No bio available", // Provide defaults for optional fields
      website: author.website || "No website available",
    },
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId) {
//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       console.log('Course not found');
//       return;
//     }

//     course.author.name = "Mosh Hamedani Updated by Avadhut";
//     const result = await course.save();
//     console.log('Updated course:', result);
//   }
//   catch (error) {
//     console.error('Error updating author:', error.message);
//   }
// }

// Example usage with more complete author data
// createCourse("Node Course", { name: "Mosh" });

async function updateAuthor(courseId) {
  const course = await Course.updateMany(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}

updateAuthor("67a75bc31bc5cc6453bbce7d");
