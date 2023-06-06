// imports
import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

// konfigurationer.
const app = express()
dotenv.config()
const port = process.env.PORT || 5995
const secret = process.env.SECRET || 'very secret secret'

// middlewares.
app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	
	next()
}) 

// routes.
app.use("/api", )

//init
app.listen(port, () => {
  console.log(`server is listening to port: ${port}`)
})