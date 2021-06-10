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
    dataService.updateGlobalData()
    var updatedGlobal = dataService.getGlobalCovidData()
    res.json(updatedGlobal)
    console.log("server - global data updated!")
})

app.get('/api/covid/countries/:name/cached', (req, res)=>{
    
    dataService.getCountryData(req.params.name, (data, error)=>{
        console.log('data: ' + data + '\nerror: ' + error)    
        
        if(error!==undefined)
        {
            res.status(404).send()
            return
        }
    
        res.json(data)
    })
})

app.get('/api/covid/countries/:name/update', (req,res)=>{
    dataService.getCountryData(req.params.name, (data, error)=>{
        dataService.updateCountryData(data)
    })
    res.send({response: 'updated'})
})

app.listen(http_port, () => {
    console.log('listening')
})