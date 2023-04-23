const mongoose = require('mongoose')


const Level3 = new mongoose.Schema({
    riddle:{type:String, required:true},
    clue:{type:String, required:true, unique: true},
    answer:{type:String, required:true},
    },
    {collection:'level3'}
)

const model = mongoose.model('Level3', Level3)

module.exports = model