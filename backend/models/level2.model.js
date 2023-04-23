const mongoose = require('mongoose')


const Level2 = new mongoose.Schema({
    riddle:{type:String, required:true},
    clue:{type:String, required:true, unique: true},
    answer:{type:String, required:true},
    },
    {collection:'level2'}
)

const model = mongoose.model('Level2', Level2)

module.exports = model