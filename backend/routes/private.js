// imports.
import express from "express";
import { getDb } from "../data/database";
import jwt from "jsonwebtoken";

// konfigurations
const router = express.Router()
const db = getDb()
dotenv.config()
const secret = process.env.SECRET || 'very secret secret'

// post login.
router.post("/login", (req, res) => {
  if( !req.body || !req.body.username || !req.body.password ) {
    res.sendStatus(400)
    return
  }
  const { username, password } = req.body
  db.read()
  let users = db.data.users

  let found = users.find(user => user.username === username)
  if( !found ) {
    console.log("felaktigt användarnamn")
    res.sendStatus(400, "Felaktigt användarnamn eller lösenord")
    return
  }
  if( found.password !== password ) {
    console.log("felaktigt lösenord")
    res.sendStatus(401, "felaktig tanvändarnamn eller lösenord")
    return
  }

  // jwt constanter.
  const hour = 60 * 60
  const payload = { userId: found.id }
  const options = { expiresIn: 1 * hour }
  let token = jwt.sign(payload, secret, options)
  console.log("Signed JWT: ", token)
  let tokenPackage = { token: token}
  res.send(tokenPackage)
} )




// exports
export default router