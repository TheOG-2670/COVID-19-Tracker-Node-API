const express = require('express')
const app = express()
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const countryParser = require('./data-service')

const http_port = 8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('works')
})

// app.get('/api/text-test', (req, res)=>{
//     res.send('text works')
// })

// app.get('/api/json-test', (req, res)=>{
//     res.send({message:'json works'})
// })

app.get('/api/getAll', (req, res) => {

    var countries = JSON.parse(fs.readFileSync(path.join(__dirname + "/data/country-store.json")))
    
    var countryArray = []
    countries.map(country => {
        fetch('https://covid19.mathdro.id/api/countries/' + country.name)
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    var countryData = {};
                    countryData.name = country.name
                    countryData.confirmed = data.confirmed.value
                    countryData.deaths = data.deaths.value
                    countryData.recovered = data.recovered.value

                    countryArray.push(countryData)
                    countryParser.createCountryData(countryArray)
                }
            })
    })

})

app.listen(http_port, () => {
    console.log('listening')
})