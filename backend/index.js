const express=require('express')
const mongoConnect=require('./db')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json())

mongoConnect()



app.use('/',require('./auth'))
app.use('/',require('./noteController'))








app.listen(9000,()=>{
    console.log("Server is listening...")
})