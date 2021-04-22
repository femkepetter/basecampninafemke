const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/witcherProject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION WITH QUESTIONS OPEN!")
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
        question: 'Do you think about decisions or make them based on your feelings?',
        answer1: 'I am a thinker, but I do not think about things for too long.',
        answer1Total: -2,
        answer2: 'I balance between thinking and feeling.',
        answer2Total: -1,
        answer3: 'I think more when I have the time but make fast decisions based on feelings.',
        answer3Total: 0,
        answer4: 'I am more of a thinker. I do not want to let my feelings influence my decisions.',
        answer4Total: 1,
        answer5: 'Feelings! I do not really think about my decisions.',
        answer5Total: 2,
    },
    {
        question: 'Do you like to be alone, or are you a people-person?',
        answer1: 'I do not mind having people around me if I do not have to talk to them.',
        answer1Total: -2,
        answer2: 'I really like to be alone.',
        answer2Total: -1,
        answer3: 'I only like to be around people that I know very well.',
        answer3Total: 0,
        answer4: 'I enjoy hanging out with people a lot! But not all the time.',
        answer4Total: 1,
        answer5: 'I hate being alone and I want to have people around me as much as I can!',
        answer5Total: 2,
    },
    {
        question: 'Are you talkative?',
        answer1: 'No, I talk as little as possible.',
        answer1Total: -4,
        answer2: 'Not really, I only talk if it is necessary.',
        answer2Total: -2,
        answer3: 'I can be talkative with people I know, but I do not like to talk with strangers.',
        answer3Total: 0,
        answer4: 'I am talkative. I do not mind if they are strangers or people I know.',
        answer4Total: 2,
        answer5: 'I never shut up! I talk as much as I can. I cannot help it.',
        answer5Total: 4,
    },
    {
        question:  'Which of these answers describe you the best?',
        answer1: 'I am very loyal.',
        answer1Total: -2,
        answer2: 'I pay attention to details. I notice things a lot faster than the average person.',
        answer2Total: -1,
        answer3: 'I am brave and determined.',
        answer3Total: 0,
        answer4: 'People would say I am intelligent.',
        answer4Total: 1,
        answer5: 'People think I have good humor and I am very friendly.',
        answer5Total: 2,
        },
        {
        question: 'Choose the flaw you recognize most in yourself.',
        answer1: 'I am very stubborn and like to go my own way.',
        answer1Total: -2,
        answer2: 'People say I can be cynical and crude.',
        answer2Total: -1,
        answer3: 'I can be a little bit naive.',
        answer3Total: 0,
        answer4: 'I crave respect and adoration.',
        answer4Total: 1,
        answer5: 'I can be too flirtatious, which can get me into trouble.',
        answer5Total: 2,
        },
        {
        question: 'What do you like to do in your free time?',
        answer1: 'I like to just hang around, and do nothing.',
        answer1Total: -4,
        answer2: 'Drinking, preferably in a pub.',
        answer2Total: -2,
        answer3: 'Playing games!',
        answer3Total: 0,
        answer4: 'I love to be creative. Creating things that are almost... magical.',
        answer4Total: 2,
        answer5: 'Making music, or listening to music!',
        answer5Total: 4,
        },
];

//COLT ZIJN CODE
// Question.insertMany(questionData)
//     .then(res => {
//         console.log("QuestionData is inserted!")
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



// console.log('This is the question seeder!');