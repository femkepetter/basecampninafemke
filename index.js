//***********************REQUIREMENTS*****************************/
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//***********************EXPRESS CONNECTIES*****************************/
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

//***********************DATABASE CONNECTIE*****************************/
//Vergeet niet de databasenaam newDatabase te veranderen naar een andere database
mongoose.connect('mongodb://localhost:27017/witcherProject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION WITH INDEX.JS OPEN!")
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!")
    console.log(err)
});

// //***********************DATABASE MODELS*****************************/
const Question = require('./public/js/questions');
const Witcher = require('./public/js/witchers');

//***********************VIEWS ROUTE*****************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//***********************ROUTES*****************************/
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('home', { 
        title:"Homepage",
        });
    });


app.get('/quiz/:question', async (req, res) => {
    const questions = await Question.find({})
    let { question } = req.params;
    let total = 0;
    question = parseInt(question)
    let next_question = 0;

    if (question + 1 <= 5) {
        next_question = question + 1;
    }

    res.render('quiz', { 
        title: "Quiz", 
        questions, 
        question,
        next_question,
        total,
    });
});


app.post('/quiz/:question', async (req, res) => {
    const questions = await Question.find({})
    let { question } = req.params;
    let answer = parseInt(req.body.answer);
    let total = 0;
    question = parseInt(question);

    if (typeof req.body.result === "undefined") {
        total = 0;
        }
    else {
        total = parseInt(req.body.result);
    };


    console.log("Typeof Answer", typeof(answer));

    console.log("Total", total);
    console.log("Answer", answer);

    let totalScore = total + answer;
    total = totalScore;

    console.log("Total score", totalScore);
    console.log(req.body);


    if (Number.isNaN(answer)) {
        console.log('Number NaN');
        } else {
        alert("you need to type hello!");
        return false;
    };

    let next_question = 0;
    if (question + 1 <= 5) {
        next_question = question + 1;
    };

    console.log("Next question", next_question);
    console.log("Question", question);

    if (question === 0) {
        if ((totalScore >= -12) && (totalScore <= -8)) {
        res.redirect('/result/0');
        } else if ((totalScore >= -7) && (totalScore <= -3)) {
        res.redirect('/result/1');
        } else if ((totalScore >= -2) && (totalScore <= 2)) {
        res.redirect('/result/2');
        } else if ((totalScore >= 3) && (totalScore <= 7)) {
        res.redirect('/result/3');
        } else if ((totalScore >= 8) && (totalScore <= 12)) {
        res.redirect('/result/4');
        };
    };

    res.render('quiz', { 
        title: "Quiz", 
        questions,  
        question,
        next_question,
        total
    }); 
});


app.get('/result/:name', async (req, res) => {
    const witchers = await Witcher.find({})
    let { name } = req.params;
    witcherIndex = parseInt(name)
    let next_witcher = 0;
     if (witcherIndex + 1 <= 5) {
         next_witcher = name + 1;
     }

    res.render('result', { 
        title: "Result", 
        witchers, 
        name,
        next_witcher,
        witcherIndex
    });
});


app.get('/monsters', (req, res) => {
    res.render('monsters', { 
    title:"Monster Library",
    });
});

//***********************SERVER CONNECTIE*****************************/
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!")
})

//Als alles goed werkt (css, server, database) mag de volgende code er wel uit:
// app.use((req, res) => {
//     console.log("WE  GOT A NEW REQUEST!")
//     res.send("HI! THIS IS YOUR RESPONSE!")
// })