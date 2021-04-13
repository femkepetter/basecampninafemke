const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/witcherProject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION WITH WITCHERS OPEN!")
})
.catch(err => {
    console.log("MONGO CONNECTION ERROR!")
    console.log(err)
});


const witcherSchema = new mongoose.Schema({
    name: String,
    min: Number,
    max: Number,
    description: String,
});

const Witcher = mongoose.model('Witcher', witcherSchema);
module.exports = Witcher;

const witcherData = [
    {
        name: 'Geralt',
        min: -12,
        max: -8,
        description: 'Despite his title, Geralt does not hail from the city of Rivia. After being left with the witchers by his mother, Visenna, he grew up in their keep of Kaer Morhen in the realm of Kaedwen. In the interest of appearing more trustworthy to potential clients, young witchers were encouraged to make up surnames for themselves by master Vesemir. As his first choice, Geralt chose "Geralt Roger Eric du Haute-Bellegarde", but this choice was dismissed by Vesemir as silly and pretentious, so "Geralt" was all that remained of his chosen name. "Of Rivia" was a more practical alternative, and Geralt even went so far as to adopt a Rivian accent to appear more authentic.',
    },
    {
        name: 'Yennefer',
        min: -7,
        max: -3,
        description: 'Yennefer of Vengerberg (born on Belleteyn of the year 1173) — a sorceress who lived in the capital city of Aedirn - Vengerberg. She was the youngest member of the Brotherhood of Sorcerers and later the Lodge of Sorceresses attempted to recruit her. She was the love of the witcher Geralt of Rivia and a mother figure to Ciri, a former royal advisor to king Demavend of Aedirn and a close friend of Triss Merigold.',
    },
    {
       name: 'Ciri',
       min: -2,
       max: 2,
       description: 'Cirilla Fiona Elen Riannon (known as Ciri or the Lion Cub of Cintra), born in 1252,[1] during the Belleteyn holiday - a princess of Cintra, daughter of Pavetta and Duny (Urcheon of Erlenwald) and granddaughter of queen Calanthe.',
   },
   {
       name: 'Dandelion',
       min: 3,
       max: 7,
       description: 'Dandelion (Original Polish and on Netflix: Jaskier, purported full name: Julian Alfred Pankratz viscount de Lettenhove) — a poet, minstrel, bard and the closest friend of witcher Geralt of Rivia. He studied seven liberal arts for four years at the Academy of Oxenfurt (during his studies, he achieved the reputation of a sloth, drunkard and idiot), later becoming a professor (after passing the exams with exceptional results) he taught students for a year, and then left the academy to travel the world. He still visits Oxenfurt from time to time to give guest lectures.',
   },
   {
       name: 'Roach',
       min: 8,
       max: 12,
       description: 'Roach (Polish: Płotka) is the name Geralt of Rivia, the witcher, gives to all of his horses. His preference is for mares.',
   }
];

//COLT ZIJN CODE
Witcher.insertMany(witcherData)
    .then(res => {
        console.log("WitcherData is inserted!")
    })
    .catch(e => {
        console.log(e)
    });

//TOBY ZIJN CODE
// witcherData.forEach(witch => {
//     let addWitcher = new Witcher(witch);
//     addWitcher.save();
// });

//Haal dubbele data eruit - answer3Total werkt als een filter
Witcher.find({ $and: [ { min: { $gte: -12 } }, { max: { $lte: 12 } } ] }, function(err, docs) {
   if (docs.length) {
       docs.forEach(doc => {
           doc.deleteOne({ _id: doc._id })
       });
   }
});

// console.log('This is the Witcher seeder!');