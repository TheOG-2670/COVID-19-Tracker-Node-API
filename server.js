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

app.post('/api/covid/initData', (req, res)=>{
    if(dataService.getCovidData().length === 0)
    {
        dataService.initData()
        console.log("server - initial data cached!")
        res.send("client - data cached!")
    }
})

app.post('/api/covid/updateData', (req, res)=>{
    dataService.updateCovidData(dataService.getCovidData())  
    console.log("server - data cache updated!")
    res.send("client - cache updated!")
})

app.get('/api/covid/getCachedData', (req, res) => {
    res.send(dataService.getCovidData())
    console.log("server - data sent to app!")
})

app.listen(http_port, () => {
    console.log('listening')
})