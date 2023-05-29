const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/passenger', function (request, response) {
  response.render('pages/passenger', { title: 'Passenger' })
})
app.get('/ticket', function (request, response) {
  response.render('pages/ticket', { title: 'Ticket' })
})
app.get('/train', function (request, response) {
  response.render('pages/train', { title: 'Train' })
})
app.get('/sold_ticket', function (request, response) {
  response.render('pages/sold_ticket', { title: 'Sold ticket' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
