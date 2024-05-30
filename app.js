const express = require('express')

const app = express()

app.get('/' , (req, res)=>{
  res.json({message:'hello from the server side', app:'Natours'})
})

const port = 3000

app.listen(port,()=>{
  console.log(`Server in running on ${port}` )
})

