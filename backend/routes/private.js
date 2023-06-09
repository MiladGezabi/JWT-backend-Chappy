// imports.
import express from "express";
import { getDb } from "../data/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { isValidMessage, generateRandomId } from "../functions.js";

// konfigurations
const router = express.Router()
const db = getDb()
dotenv.config()
const secret = process.env.SECRET || 'very secret secret'

// post login, kollar om personen finns i databasen och granskar att både användarnamn och lössenord stämmer sedan skapar den och skickar en jwt till användaren.
router.post("/login", async (req, res) => {
  if( !req.body || !req.body.username || !req.body.password ) {
    res.sendStatus(400)
    return
  }
  const { username, password } = req.body
  await db.read()
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

// -------------------------------------------------------

// routs för Koda kanalen.
// Get kollar om man är inloggad och hämtar alla medelanden i Koda Kanalen.
router.get('/koda', async (req, res) => {
	let authHeader = req.headers.authorization
	if( !authHeader ) {
		res.status(401).send({
			message: 'You must log in to get access to this chat.'
		})
		return
	}
	let token = authHeader.replace('Bearer ', '')
  await db.read()
  let users = db.data.users

	try {
		let jwtDecoded = jwt.verify(token, secret)
		let userId = jwtDecoded.userId
		let user = users.find(u => u.id === userId)
		console.log(`User "${user.username}" has access to secret data.`)
		
		const kodaChannel = db.data.private.find(channel => channel.title === "Koda")
		res.send(kodaChannel.messages)

	} catch(error) {
		res.sendStatus(401)
	}
})

// Post Kollar om det är rätt user och rätt body sedan läggs medelande till Koda kanalen i databasen med två nya egenskaper som är name och id.
router.post("/koda", async (req, res) => {
  let authHeader = req.headers.authorization
	if( !authHeader ) {
		res.status(401).send({
			message: 'You dont must log in to get access to this chat.'
		})
		return
	}
	let token = authHeader.replace('Bearer ', '')
  await db.read()
  let users = db.data.users

	try {
		let jwtDecoded = jwt.verify(token, secret)
		let userId = jwtDecoded.userId
		let user = users.find(u => u.id === userId)
		console.log(`User "${user.username}" has access to private chat.`)

    let message = req.body.message

    console.log(message)
    let maybeMessage = {
      id: generateRandomId(),
      name: user.username,
      message: message
    };
		
    if(isValidMessage(maybeMessage)) {
      const kodaChannel = db.data.private.find(channel => channel.title === "Koda")
      kodaChannel.messages.push(maybeMessage)
      await db.write()
      res.send({ id: maybeMessage.id })
    } else {
      res.sendStatus(400)
    }
	} catch(error) {
    console.error('Error:', error);
		res.sendStatus(401)
	}
})


// ----------------------------------------------------------

// routes för Aktier kanalen.

// Get kollar om man är inloggad och hämtar alla medelanden i Aktier Kanalen.

router.get('/aktier', async (req, res) => {
	let authHeader = req.headers.authorization
	if( !authHeader ) {
		res.status(401).send({
			message: 'You must log in to get access to this chat.'
		})
		return
	}
	let token = authHeader.replace('Bearer ', '')
  await db.read()
  let users = db.data.users

	try {
		let jwtDecoded = jwt.verify(token, secret)
		let userId = jwtDecoded.userId
		let user = users.find(u => u.id === userId)
		console.log(`User "${user.username}" has access to private chat.`)
		
		const aktierChannel = db.data.private.find(channel => channel.title === "Aktier")
		res.send(aktierChannel.messages)

	} catch(error) {
		res.sendStatus(401)
	}
})


// Post Kollar om det är rätt user och rätt body sedan läggs medelande till Aktier kanalen i databasen med två nya egenskaper som är name och id.
router.post("/aktier", async (req, res) => {
  let authHeader = req.headers.authorization
	if( !authHeader ) {
		res.status(401).send({
			message: 'You dont must log in to get access to this chat.'
		})
		return
	}
	let token = authHeader.replace('Bearer ', '')
  await db.read()
  let users = db.data.users

	try {
		let jwtDecoded = jwt.verify(token, secret)
		let userId = jwtDecoded.userId
		let user = users.find(u => u.id === userId)
		console.log(`User "${user.username}" has access to private chat.`)

    let message = req.body.message

    console.log(message)
    let maybeMessage = {
      id: generateRandomId(),
      name: user.username,
      message: message
    };
		
    if(isValidMessage(maybeMessage)) {
      const aktierChannel = db.data.private.find(channel => channel.title === "Aktier")
      aktierChannel.messages.push(maybeMessage)
      await db.write()
      res.send({ id: maybeMessage.id })
    } else {
      res.sendStatus(400)
    }
	} catch(error) {
    console.error('Error:', error);
		res.sendStatus(401)
	}
})




// exports
export default router