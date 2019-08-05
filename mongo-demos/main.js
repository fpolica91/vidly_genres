const mongoose = require('mongoose')



// creates a connection and instatiats playground upon connection
mongoose.connect('mongodb://localhost/playground')
    .then(() => {
        console.log('connectd to mongodb')
    }).catch(err => console.error('couldnt conect', err))

// SCHEMAS -> are used to validate the type of data that will be POSTED

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPub: Boolean
})


// MODELS - CLASS: COURSE - OBJ: NODECOURSE

// THIS IS A CLASS, WE PASS THE SCHEMA FOR VALIDATION
const Course = mongoose.model('Course', courseSchema);


// THIS IS AN OBJECT, HAS ALL THE PROPERTIES IN THE COURSESCHEMA-> SIMILAR TO A CONSTR
const React = new Course({
    name: 'React',
    author: "Jesus",
    tags: ["Facebook", 'Library'],
    isPub: true
});

const jQuery = new Course({
    name: 'jQuery',
    author: "Hans",
    tags: ["useless", 'Library'],
    isPub: true
});


// SAVES THE COURSE IN DB
async function createCourse(item) {
    const res = await item.save()
    console.log(res)
}




