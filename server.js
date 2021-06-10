const express = require('express')
const app = express()
const dataService = require('./data-service')
const http_port = 8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('works')
})

app.post('/api/covid/initData', (req, res)=>{
        dataService.initData()
        console.log("server - initial data cached!")
        res.send("client - data cached!")
})

app.get('/api/covid/cachedData', (req, res)=>{
    var updatedData = dataService.getCovidData()
    res.setHeader('Content-Type', 'application/json')
    res.json(updatedData)
    console.log("server - data cache updated!")
})

app.get('/api/covid/countries/:name', (req, res)=>{
    console.log(req.params.name)
    
    dataService.getCountryData(req.params.name, (data)=>{
        console.log(data)
        res.json(data)
    })
})

app.listen(http_port, () => {
    console.log('listening')
})