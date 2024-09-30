require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

const Person = require('./models/person')

morgan.token('body', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } 
    return ''
})

app.use(express.static('dist'))

const cors = require('cors')

app.use(cors())

app.use(express.json())

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
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

/*
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 1000)

app.post('/api/persons', (request, response) => {
    const body = request.body

    // console.log('body content name => ' + body.content.name)

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.some(p => p.name === body.content.name)) {
        return response.status(400).json({
            error: 'this name is already added'
        })
    }

    const person = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})
*/

// info

app.get('/info', (request, response) => {
    const requestDate = new Date().toString()

    console.log(requestDate)
    
    response.send(`
                        <p>Phonebook has info for ${persons.length} people</p>
                        <br />
                        <p>${requestDate}</p>
        `)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})