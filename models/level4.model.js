const mongoose = require('mongoose')


const Level4 = new mongoose.Schema({
    riddle:{type:String, required:true},
    clue:{type:String, required:true, unique: true},
    answer:{type:String, required:true},
    },
    {collection:'level4'}
)

const model = mongoose.model('Level4', Level4)

module.exports = model