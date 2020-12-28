const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const dataService = require('./data-service')

const http_port = 8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('works')
})

app.get('/api/getAll', (req, res) => {

    var countries = JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
    // console.log(countries.length)
    if (countries.length == 0) 
    {
        dataService.initCountries()
    }
    else
    {
        dataService.setCovidData(countries)
    }

})

app.listen(http_port, () => {
    console.log('listening')
})