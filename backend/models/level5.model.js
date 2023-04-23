const mongoose = require('mongoose')


const Level5 = new mongoose.Schema({
    riddle:{type:String, required:true},
    clue:{type:String, required:true, unique: true},
    answer:{type:String, required:true},
    },
    {collection:'level5'}
)

const model = mongoose.model('Level5', Level5)

module.exports = model