const { MongoGCPError } = require('mongodb')
const mongoose = require('mongoose')

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

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
} else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person
        .find({})
        .then(persons => {
            persons.forEach(p => {
                console.log(`${p.name} ${p.number}`)
            })
            mongoose.connection.close()

        })
        
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: name,
        number: number,
        id: Math.floor(Math.random() * 1000) + 1
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

