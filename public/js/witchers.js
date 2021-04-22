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
    image: String,
    min: Number,
    max: Number,
    description: String,
});

const Witcher = mongoose.model('Witcher', witcherSchema);
module.exports = Witcher;

const witcherData = [
    {
        name: 'Roach',
        image: 'https://cdn.vox-cdn.com/thumbor/HTag7-kXJUkOEwNXdCwuNN7Ec3k=/0x0:1920x1080/1200x800/filters:focal(552x0:858x306)/cdn.vox-cdn.com/uploads/chorus_image/image/65995681/witcher_3.0.jpg',
        min: -16,
        max: -10,
        description: 'Looks like you are a horse! Roach is much more than a horse, and much more than a flying horse for some of you as well. Roach is like an anchor to Geralts tried and true self. If you are like Roach, you are someone who is very loyal but at the same time very stubborn! You like to go your own way, and you make fast but well thought out decisions. You do not mind being around people, as long as you do not have to participate in the conversation too much. Oh and we are sorry guys: Roach always is a mare! ',
    },
    {
        name: 'Geralt',
        image: 'https://i.pinimg.com/736x/5c/db/a0/5cdba0c973e261c20843aceed592056d.jpg',
        min: -9,
        max: -3,
        description: 'Ahh, you are THE Witcher! Geralt was abandoned by his parents at Kaer Morhen, and was trained to be a witcher. You resemble Geralt, which means you probabily like to be alone. You pay attention to detail and only speak when necessary. Although you also listen to your feelings, when faced with a decision you always think things through. Unstructered is a way to describe your life, but you always seem to make it work. We hope you have the physical abilities that Geralt has too! And long white hair, who does not want that?',
    },
    {
       name: 'Ciri',
       image: 'https://i.pinimg.com/originals/0b/87/57/0b8757d8a3482beb91387db7d75d6d0d.jpg',
       min: -2,
       max: 2,
       description: 'Ciri grew up as a princess in Cintra. Not that you are similar to a princess! As a matter of fact, if you are like Ciri, you are brave and determined. You are reserved, but open up to people you really care about. The decisions you make are well thought out, but if you do not have a lot of time to decide you can be very intuitive. Although you are smart, you tend to be a little naive. Underneath your quiet and naive persona, you shelter a lot of strength. You can call yourself Lion Cub now, if you want.',
   },
   {
       name: 'Yennefer',
       image: 'https://i.pinimg.com/originals/23/bc/80/23bc80688566c9dd601f13fb7c71890d.jpg',
       min: 3,
       max: 9,
       description: 'You are powerful, intelligent and creative. Yennefer grew up in a literal pig pen but became a powerful sorceress. If you are like her you like to speak your mind and are comfortable around people. You can make it far in life, but not always with the right motivation. Respect and adoration is something you tend to search for, although you do not like to admit it. You think everything through and do not want to listen to your feelings. Luckily you are not as dangerous as Yennefer when you are faced with pent-up emotions. We hope. ',
   },
   {
       name: 'Dandelion',
       image: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/BE/nl/999/EP4497-CUSA01439_00-AV00000000000002/1596211812000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000',
       min: 10,
       max: 16,
       description: 'Some people will find you annoying, but some will think you are a joy to be around! Just like Dandelion. Dandelion — a poet, minstrel, bard and the closest friend of witcher Geralt of Rivia. No one will mistake you for an introvert. You have good humor, are friendly and flirtatious. Those are all good traits, but too much of this may annoy people or get you into trouble. You are a lot to handle! If you like someone you will not let them go. Hopefully they will feel the same. Do not change, just do not get into trouble like Dandelion does sometimes.',
   }
];

//COLT ZIJN CODE
// Witcher.insertMany(witcherData)
//     .then(res => {
//         console.log("WitcherData is inserted!")
//     })
//     .catch(e => {
//         console.log(e)
//     });

//TOBY ZIJN CODE
witcherData.forEach(witch => {
    let addWitcher = new Witcher(witch);
    addWitcher.save();
});

//Haal dubbele data eruit - answer3Total werkt als een filter
Witcher.find({ $and: [ { min: { $gte: -16 } }, { max: { $lte: 16 } } ] }, function(err, docs) {
   if (docs.length) {
       docs.forEach(doc => {
           doc.deleteOne({ _id: doc._id })
       });
   }
});

// console.log('This is the Witcher seeder!');