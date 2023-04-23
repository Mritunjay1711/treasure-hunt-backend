const mongoose = require('mongoose')


const Level1 = new mongoose.Schema({
    riddle:{type:String, required:true},
    clue:{type:String, required:true, unique: true},
    answer:{type:String, required:true},
    },
    {collection:'level1'}
)

const model = mongoose.model('Level1', Level1)

module.exports = model