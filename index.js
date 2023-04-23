const express = require('express')
const app = express()
const User = require('./models/user.model')
const level1 = require('./models/level1.model')
const level2 = require('./models/level2.model')
const level3 = require('./models/level3.model')
const level4 = require('./models/level4.model')
const level5 = require('./models/level5.model')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 1337
require('dotenv').config()

app.use(cors())
app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/treasure-hunt');
mongoose.connect(process.env.MONGO_URI);


app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email' })
    }

});


app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, process.env.JSON_TOKEN)
        return res.json({ status: 'ok', user: token, name:user.name })
    } else {
        return res.json({ status: 'error', user: false })
    }
});

app.post('/api/deleteuser', async (req, res) => {
    const user = await User.deleteOne({
        email: req.body.email,
    })
    if (user.deletedCount === 1) {
        return res.json({status:'ok'})
    } else {
        return res.json({status:'error'})
    }
})


app.get('/api/users', async (req, res) => {

    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    if (email === 'admin@admin.com') {
        try {

            const user = await User.find()
            // console.log(user)
            return res.json(user)
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: 'invalid token' })
        }
    }
    else {
        res.json({ status: 'error', error: 'invalid access' })
    }
});

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, process.env.JSON_TOKEN)
        const email = decoded.email
        const user = await User.updateOne({ email: email }, { $set: { quote: req.body.quote } })

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

});


//Admin controls
app.post('/api/adminlogin', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user && user.name === 'admin') {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, process.env.JSON_TOKEN)
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
});

//adding data to level1
app.post('/api/addlevel1', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    // console.log(req.body)
    // console.log(email)
    if (email === 'admin@admin.com') {
        try {
            await level1.create({
                riddle: req.body.riddle,
                clue: req.body.clue,
                answer: req.body.answer,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err)
            res.json({ status: 'error', error: 'Duplicate Riddle' })
        }
    }
    else {
        res.json({ status: 'error', error: 'Invalid access' })
    }

});

//adding data to level2
app.post('/api/addlevel2', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    // console.log(req.body)
    // console.log(email)
    if (email === 'admin@admin.com') {
        try {
            await level2.create({
                riddle: req.body.riddle,
                clue: req.body.clue,
                answer: req.body.answer,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err)
            res.json({ status: 'error', error: 'Duplicate Riddle' })
        }
    }
    else {
        res.json({ status: 'error', error: 'Invalid access' })
    }

});

//adding data to level3
app.post('/api/addlevel3', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    // console.log(req.body)
    // console.log(email)
    if (email === 'admin@admin.com') {
        try {
            await level3.create({
                riddle: req.body.riddle,
                clue: req.body.clue,
                answer: req.body.answer,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err)
            res.json({ status: 'error', error: 'Duplicate Riddle' })
        }
    }
    else {
        res.json({ status: 'error', error: 'Invalid access' })
    }

});

//adding data to level4
app.post('/api/addlevel4', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    // console.log(req.body)
    // console.log(email)
    if (email === 'admin@admin.com') {
        try {
            await level4.create({
                riddle: req.body.riddle,
                clue: req.body.clue,
                answer: req.body.answer,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err)
            res.json({ status: 'error', error: 'Duplicate Riddle' })
        }
    }
    else {
        res.json({ status: 'error', error: 'Invalid access' })
    }

});


//adding data to level5
app.post('/api/addlevel5', async (req, res) => {
    const token = req.headers['x-access-token']
    const decoded = jwt.verify(token, process.env.JSON_TOKEN)
    const email = decoded.email
    // console.log(req.body)
    // console.log(email)
    if (email === 'admin@admin.com') {
        try {
            await level5.create({
                riddle: req.body.riddle,
                clue: req.body.clue,
                answer: req.body.answer,
            })
            res.json({ status: 'ok' })
        } catch (err) {
            console.log(err)
            res.json({ status: 'error', error: 'Duplicate Riddle' })
        }
    }
    else {
        res.json({ status: 'error', error: 'Invalid access' })
    }

});



//fetching data from level 1
app.get('/api/level1', async (req, res) => {
    try {
        const data = await level1.aggregate([{ $sample: { size: 1 } }])
        // console.log(data[0].riddle)
        return res.json({ status: 'ok', riddle: data[0].riddle, clue: data[0].clue, answer: data[0].answer })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Could not fetch data' })
    }

});

//fetch data for level2
app.get('/api/level2', async (req, res) => {
    try {
        const data = await level2.aggregate([{ $sample: { size: 1 } }])
        console.log(data[0].riddle)
        return res.json({ status: 'ok', riddle: data[0].riddle, clue: data[0].clue, answer: data[0].answer })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Could not fetch data' })
    }

});

//fetching data for level3
app.get('/api/level3', async (req, res) => {
    try {
        const data = await level3.aggregate([{ $sample: { size: 1 } }])
        console.log(data[0].riddle)
        return res.json({ status: 'ok', riddle: data[0].riddle, clue: data[0].clue, answer: data[0].answer })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Could not fetch data' })
    }

});


//fetching data for level4
app.get('/api/level4', async (req, res) => {
    try {
        const data = await level4.aggregate([{ $sample: { size: 1 } }])
        console.log(data[0].riddle)
        return res.json({ status: 'ok', riddle: data[0].riddle, clue: data[0].clue, answer: data[0].answer })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Could not fetch data' })
    }

});


//fetching data for level5
app.get('/api/level5', async (req, res) => {
    try {
        const data = await level5.aggregate([{ $sample: { size: 1 } }])
        console.log(data[0].riddle)
        return res.json({ status: 'ok', riddle: data[0].riddle, clue: data[0].clue, answer: data[0].answer })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Could not fetch data' })
    }

});

app.get('/', (req, res) => {
    console.log("Hello")
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})