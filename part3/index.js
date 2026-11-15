require('dotenv').config()

const Person = require('./models/person')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    Person.countDocuments({}).then(personsCount => {
      const date = Date()
      const info =    `<div>Phonebook has info for ${personsCount} people</div>
                      <div>${date}</div>`
      response.send(info)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if(person) {
      response.json(person)
    } else {
      console.log("ID NOT FOUND")
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body) {
    return response.status(400).json({ 
      error: 'body undefined' 
    })
  }

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  //As indicated in the question, you can ignore this for now
  // const repeatedName = persons.some(p => p.name === body.name)
  // if (repeatedName) {
  //   return response.status(400).json({ 
  //     error: 'name must be unique' 
  //   })
  // }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})