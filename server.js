import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/user.js'

dotenv.config()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB.....')

    const users = [
        {
            name: 'John',
            email: 'john@gmail.com',
            password: '123456'
        },
        {
            name: 'Jane',
            email: 'jane@gmail.com',
            password: '23456'
        },
        {
            name: 'Bob',
            email: 'bob@gmail.com',
            password: '34567'
        }
    ]

    User.create(users)

    app.get('/api/users', (req,res) => {
        User.find().then((users) => {
            res.json(users)
            })
    })

    app.post('/api/users', (req,res) => {
        const {name, email, password} = req.body
        const newUser = new User ({name, email, password})
        newUser.save().then((user) => {
            res.json(user)
            })
    })

    app.put('/api/users/:id', (req,res) => {
        const {id} = req.params
        const {name, email, password} = req.body
        User.findByIdAndUpdate(id, {name, email, password}).then((user) => {
            res.json(user)
            })
    })

    app.delete('/api/users/:id', (req,res) => {
        const {id} = req.params
        User.findByIdAndDelete(id).then((user) => {
            res.json(user)
        })
    })

}).catch(err => {
    console.log('Error connecting to MongoDB', err)
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}....`)
})