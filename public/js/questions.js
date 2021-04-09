const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/witcherProject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN!")
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!")
    console.log(err)
});

 const questionSchema = new mongoose.Schema({
     question: String,
     answer1: String,
     answer1Total: Number,
     answer2: String,
     answer2Total: Number,
     answer3: String,
     answer3Total: Number,
     answer4: String,
     answer4Total: Number,
     answer5: String,
     answer5Total: Number,
 });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

const questionData = [ 
    {
        question: 'What is one of your flaws?',
        answer1: 'I am impulsive',
        answer1Total: -2,
        answer2: 'I struggle with self-doubt',
        answer2Total: -1,
        answer3: 'I have a tendency to go places where I do not belong',
        answer3Total: 0,
        answer4: 'I am very stubborn',
        answer4Total: 1,
        answer5: 'I do not know when to shut up',
        answer5Total: 2,
    },
    {
        question: 'What do you dislike?',
        answer1: 'Portals',
        answer1Total: -2,
        answer2: 'Not getting what I want',
        answer2Total: -1,
        answer3: 'Shoes that do not fit',
        answer3Total: 0,
        answer4: 'Being told what to do',
        answer4Total: 1,
        answer5: 'Monsters',
        answer5Total: 2,
    },
    {
        question: 'What is your greatest skill?',
        answer1: 'Fighting',
        answer1Total: -2,
        answer2: 'Magic',
        answer2Total: -1,
        answer3: 'Screaming',
        answer3Total: 0,
        answer4: 'Singing',
        answer4Total: 1,
        answer5: 'Walking long distances',
        answer5Total: 2,
    },
    {
        question: 'When you have free time, what do you like to do?',
        answer1: 'Going to a brothel',
        answer1Total: -2,
        answer2: 'Playing boardgames',
        answer2Total: -1,
        answer3: 'Enchanting goodlooking males',
        answer3Total: 0,
        answer4: 'Making music',
        answer4Total: 1,
        answer5: 'Eating and pooping',
        answer5Total: 2,
        },
        {
        question: 'What do you do when you are attacked?',
        answer1: 'FIGHT!',
        answer1Total: -2,
        answer2: 'Put a spell on them!',
        answer2Total: -1,
        answer3: 'Scream!!!',
        answer3Total: 0,
        answer4: 'I freeze and piss my pants',
        answer4Total: 1,
        answer5: 'Run away',
        answer5Total: 2,
        },
        {
        question: 'How much do you like to sleep?',
        answer1: 'As little as possible',
        answer1Total: -2,
        answer2: 'A few hours maybe',
        answer2Total: -1,
        answer3: 'Just a normal 8 hours',
        answer3Total: 0,
        answer4: 'As long as I possibly can',
        answer4Total: 1,
        answer5: 'I take a lot of naps during the day',
        answer5Total: 2,
        },
];

//COLT ZIJN CODE
// Question.insertMany(questionData)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     });

    //TOBY ZIJN CODE
questionData.forEach(q => {
     let addQuestion = new Question(q);
     addQuestion.save();
 });

//Haal dubbele data eruit - answer3Total werkt als een filter
Question.find({ answer3Total: { $eq: 0 } }, function(err, docs) {
    if (docs.length) {
        docs.forEach(doc => {
            doc.deleteOne({ _id: doc._id })
        });
    }
});



console.log('This is the question seeder!');