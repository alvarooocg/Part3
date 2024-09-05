const { MongoGCPError } = require('mongodb')
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://alvarocg:${password}@cluster0.gzh3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})