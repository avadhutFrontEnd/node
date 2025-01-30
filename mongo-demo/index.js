const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true

  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v),
  },
});

// once we have a "schema", we need to compile that into a "model", which gives us a "Class" :
const Course = mongoose.model("course", courseSchema);
// Next, we can create an "object" based on that "Class" and this "object" maps to a "document" in a MongoDB database

async function createCourse() {
  const course = new Course({
    // we pass an "object" to initialize our "course" object

    name: "Angular Course",
    category: "Web",
    author: "Mosh",
    tags: ['frontend'],
    isPublished: true,
    price: 15.8,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (Field in ex.errors) 
      console.log(ex.errors[Field].message);
  }
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
  // .find({ author: "Mosh", isPublished: true })
  .find({ _id: '679b87e58c784d5c5dd1887d'})
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
    // .skip((pageNumber - 1) * pageSize)
    // .limit(10)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  // .countDocuments();
  console.log(courses[0].price);
}

getCourses();

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

// updateCourse('67944c5e8849f9de893ad160');

// **************  #18--Updating-a-Document-Update-First_mp4_6m_14s
async function updateCourse(id) {
  // 2nd Approach: Update First
  // Update directly
  // Optionally: get the updated document
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: false,
      },
    },
    { new: false }
  );
  console.log(course);
}

// updateCourse("67944d2fa68106be7f55e806");

// **************  #19-Removing-Documents_mp4_2m_38s
async function removeCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

// removeCourse("67944d2fa68106be7f55e806");
