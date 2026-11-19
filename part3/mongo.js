const mongoose = require('mongoose')

const args = process.argv.length
if ( args < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://amineott:${password}@cluster0.nxqopme.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: () => Math.floor(Math.random() * 1000000)
  },
  name: String,
  phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const phoneNumber = process.argv[4]

if (name && phoneNumber) {
  const person = new Person({
    name: name,
    phoneNumber: phoneNumber,
  })
  person.save().then(() => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.map(p => console.log(`${p.name} ${p.phoneNumber}`))
    mongoose.connection.close()
  })
}