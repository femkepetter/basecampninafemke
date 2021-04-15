//***********************REQUIREMENTS*****************************/
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//***********************EXPRESS CONNECTIES*****************************/
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/node_modules/animate.css'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/wowjs/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

//***********************DATABASE CONNECTIE*****************************/
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
    question = parseInt(question);
    let total = 0;
    let next_question = 0;

    if (question + 1 <= 5) {
        next_question = question + 1;
    };

    res.render('quiz', { 
        title: "Quiz", 
        questions, 
        question,
        next_question,
        total
    });
});


app.post('/quiz/:question', async (req, res) => {
    const questions = await Question.find({})
    let { question } = req.params;
    question = parseInt(question);
    let answer = parseInt(req.body.answer);
    let total = 0;

    if (typeof req.body.result === "undefined") {
        total = 0;
        }
    else {
        total = parseInt(req.body.result);
    };

    let totalScore = total + answer;
    total = totalScore;

    let next_question = 0;
    if (question + 1 <= 5) {
        next_question = question + 1;
    };

    console.log("Total score", totalScore);
    console.log("Answer", answer);
    console.log("Next question", next_question);
    console.log("Question", question);
    console.log(req.body);

    if (question === 0) {
        if ((totalScore >= -16) && (totalScore <= -10)) {
        res.redirect('/result/0');
        } else if ((totalScore >= -9) && (totalScore <= -3)) {
        res.redirect('/result/1');
        } else if ((totalScore >= -2) && (totalScore <= 2)) {
        res.redirect('/result/2');
        } else if ((totalScore >= 3) && (totalScore <= 9)) {
        res.redirect('/result/3');
        } else if ((totalScore >= 10) && (totalScore <= 16)) {
        res.redirect('/result/4');
        }; 
        } else { res.render('quiz', { 
        title: "Quiz", 
        questions,  
        question,
        next_question,
        total
        }); 
    };
  
});


app.get('/result/:name', async (req, res) => {
    const witchers = await Witcher.find({});
    let { name } = req.params;
    let { image } = req.params;
    let witcherIndex = parseInt(name);

    let next_witcher = 0;
     if (witcherIndex + 1 <= 5) {
         next_witcher = witcherIndex + 1;
     };

    console.log("Witcherindex", witcherIndex);
    console.log("Next witcher", next_witcher);

    res.render('result', { 
        title: "Result", 
        witchers, 
        name,
        next_witcher,
        witcherIndex,
        image
    });
});


app.get('/monsters', (req, res) => {
    res.render('monsters', { 
    title:"Monster Manual",
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
    title:"About Us",
    });
});

app.get('/monsters-filter', (req, res) => {
    res.render('monsters-filter', { 
    title:"Monster Manual",
    });
});


//***********************SERVER CONNECTIE*****************************/
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!")
});
