const express = require('express')
const router = require('./routes')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public'))) // untuk menghubungkan style.css di folder public dengan .ejs ( tanpa ini tidak bisa )
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})