const mongoose = require('mongoose');
const Model = require('./models/data');

mongoose.connect('mongodb://localhost:27017/newDatabase', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN!")
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!")
    console.log(err)
});

//***********************DATACHECK TO SEE IF IT WORKS****************************/
// const d = new Model({
//     name: 'Test Name',
//     other: 12,
//     category: 'category1'
// });

// d.save()
//     .then(d => {
//     console.log(d)
//     })
//     .catch(e => {
//     console.log(e)
//     });

// //***********************MORE TESTDATA*****************************/
// const seedData = [
//     {
//         name: 'Test Name',
//         other: 12,
//         category: 'category1'
//     },
//     {
//         name: 'Another Test',
//         other: 4,
//         category: 'category1'
//     },
//     {
//         name: 'More Names',
//         other: 4544545,
//         category: 'category2'
//     },
//     {
//         name: 'Testing Testing',
//         other: 545,
//         category: 'category3'
//     }
// ]

// Model.insertMany(seedData)
// .then(res => {
//     console.log(res)
// })
// .catch(e => {
//     console.log(e)
// });