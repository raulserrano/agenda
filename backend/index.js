const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json());

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "address": "Helsinki",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "address": "London",
      "id": "2"
    },
    {
      "id": "7182",
      "name": "raul",
      "number": "111111111",
      "address": "Madrid"
    },
    {
      "id": "f88f",
      "name": "juan",
      "number": "2222222222",
      "address": "Barcelona"
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>PRUEBA DE RUTA RAIZ</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons) 
})

// Consulta get de un registro por id. Si no existe el id, devuelve un 404
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id 
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()  
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id    
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})



app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                 <p>${new Date()}</p>`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body 
  if (!body.name || !body.number || !body.address) {
    return response.status(400).json({
      error: 'name, number or address missing'
    })
  }
  if (persons.find(p => p.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    address: body.address,
    id: Math.random().toString(36).substring(2, 9)
  }
  persons = persons.concat(person)
  response.json(person)
})

// Si ninguna ruta es tratada, devuelve un 404
const rutaDesconocida = (request, response) => {
  response.status(404).send({ error: 'Ruta desconocida' })
}

app.use(rutaDesconocida)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
