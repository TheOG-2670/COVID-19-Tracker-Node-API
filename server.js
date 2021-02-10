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
    if(dataService.getCovidData().length === 0)
    {
        dataService.initData()
        console.log("server - initial data cached!")
        res.send("client - data cached!")
    }
})

app.get('/api/covid/getCachedData', (req, res)=>{
    var updatedData = dataService.getCovidData()
    console.log(updatedData)
    res.send(updatedData)
    console.log("server - data cache updated!")
})

app.listen(http_port, () => {
    console.log('listening')
})