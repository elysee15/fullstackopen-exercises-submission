const mongoose = require('mongoose')

const password = process.argv[2]
const dbname = 'phonebook'
const url = `mongodb+srv://elyseebleu:${password}@cluster0.kcjzc.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('contact', contactSchema)

process.argv.length === 3 ? Contact.find({}).then(contacts => {
  console.log('phonebook:')
  contacts.forEach(contact => {
    console.log(`${contact.name} ${contact.number}`)
  })
}) : null

const name = process.argv[3]
const number = process.argv[4]

const contact = new Contact({ name, number })

process.argv.length === 5 ? contact.save().then(res => {
  console.log(`added ${res.name} number ${res.name} to phonebook`)
  mongoose.connection.close()
}) : null

if (process.argv.length < 3){
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}