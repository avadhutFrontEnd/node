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
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors: authors.map((author) => ({
      name: author.name,
      bio: author.bio || "No bio available",
      website: author.website || "No website available",
    })),
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

// addAuthor("67aa0d36e8aebc4dd55abe62", { name: "Avadhut" });

async function removeAuthor(courseId, authorId) {
  const course = await Course.findByIdAndUpdate(
    courseId, 
    { $pull: { authors: { _id: authorId } } },
    { new: true }
  );
  
  console.log(course);
}

removeAuthor("67aa0d36e8aebc4dd55abe62", "67aa0f6ac79801fb2fea5595");

// Example usage with more complete author data
// createCourse("Node Course", [{ name: "Mosh" }, { name: "John" }]);

// async function updateAuthor(courseId) {
//   const course = await Course.updateMany(
//     { _id: courseId },
//     {
//       $unset: {
//         author: "",
//       },
//     }
//   );
// }

// updateAuthor("67a75bc31bc5cc6453bbce7d");
