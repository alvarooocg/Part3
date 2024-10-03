require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// const { default: Persons } = require('../Front-end/e3.13-3.14/src/components/Persons')

const app = express()

morgan.token('body', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } 
    return ''
})

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

/*
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/


// /api/persons

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(persons => {
        if(persons) {
            response.json(persons)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// const generateId = () => Math.floor(Math.random() * 1000)


app.post('/api/persons', (request, response) => {
    const body = request.body

    // console.log('body content name => ' + body.content.name)

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    /*
    if (Person.some(p => p.name === body.content.name)) {
        return response.status(400).json({
            error: 'this name is already added'
        })
    }
    */

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    // persons = persons.concat(person)
    // response.json(person)
    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson))
        .catch(error => next(error))
})

// info


app.get('/info', (request, response) => {
    const requestDate = new Date().toString();

    Person.find({}).then(persons => {
        const numberOfPeople = persons.length;

        response.send(`
            <p>Phonebook has info for ${numberOfPeople} people</p>
            <br />
            <p>${requestDate}</p>
        `);
    }).catch(error => next(error));
})


app.use(unknownEndpoint)
app.use(errorHandler)

// E3.16 already done 

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})