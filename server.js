//TODO: add route to update cache

const express = require('express')
const app = express()
const dataService = require('./data-service')
const http_port = 8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('works')
})

app.get('/api/covid/initData', (req, res)=>{
        dataService.initData()
        console.log("server - initial data cached!")
        res.send("client - data cached!")
})

app.get('/api/covid/global', (req, res)=>{
    var updatedGlobal = dataService.getGlobalCovidData()
    res.setHeader('Content-Type', 'application/json')
    res.json(updatedGlobal)
    console.log("server - global data updated!")
})

app.get('/api/covid/countries/:name', (req, res)=>{
    console.log(req.params.name)
    
    dataService.getCountryData(req.params.name, (data)=>{
        console.log(data)
        res.setHeader('Content-Type', 'application/json')
        res.json(data)
    })
})

app.listen(http_port, () => {
    console.log('listening')
})