// imports
import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import PublicRouter from "./routes/public.js"
import UsersRouter from "./routes/users.js"

// konfigurationer.
const app = express()
dotenv.config()
const port = process.env.PORT || 5995


// middlewares.
app.use( cors() )
app.use( express.json() )
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	
	next()
}) 

// routes.
app.use("/api/public", PublicRouter)
app.use("/api/users", UsersRouter)
app.use("/api/private", PrivateRouter)


//init
app.listen(port, () => {
  console.log(`server is listening to port: ${port}`)
})