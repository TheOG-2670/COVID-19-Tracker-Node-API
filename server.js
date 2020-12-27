const express=require('express')
const app=express()
const http_port=8080

app.use(express.text())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('works')
})

app.get('/api/text-test', (req, res)=>{
    res.send('text works')
})

app.get('/api/json-test', (req, res)=>{
    res.send({message:'json works'})
})

app.listen(http_port,()=>{
    console.log('listening')
})