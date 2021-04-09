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
    console.log("MONGO CONNECTION OPEN!")
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
app.get('/', (req, res) => {
    res.render('home', { 
        title:"Homepage",
        });
    });

app.get('/quiz', async (req, res) => {
    const questions = await Question.find({})
    const witchers = await Witcher.find({})
    res.render('quiz', { 
        title:"Quiz", questions, witchers
    });
    console.log(questions);
    console.log(witchers);
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