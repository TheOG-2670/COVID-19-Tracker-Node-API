const express = require('express')
const app = express()
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const http_port = 8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('works')
})

app.get('/api/getAll', (req, res) => {

    var data = fs.readFileSync(path.join(__dirname + '/data/country-store.json'))
    var countries = []
    if (data.length == 0) {
        fetch('https://covid19.mathdro.id/api/countries')
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (!data.error) {
                    data.countries.map(country => {
                        var countryData = {}
                        countryData.name = country.name
                        countries.push(countryData)
                        fs.writeFileSync(path.join(__dirname + '/data/country-store.json'), JSON.stringify(countries), (error) => {
                            if (error)
                                console.log(error)
                        })
                    })
                }
            })
    }

})

app.listen(http_port, () => {
    console.log('listening')
})