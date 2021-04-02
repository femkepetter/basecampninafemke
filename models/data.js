const mongoose = require('mongoose');

const newSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    other: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['category1', 'category2', 'category3']
    }
})

const Model = mongoose.model('Model', newSchema);

//Met deze code kan je je model ergens anders gebruiken
module.exports = Model;