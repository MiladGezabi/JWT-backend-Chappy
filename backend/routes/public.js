//imports
import express from "express"
import { getDb } from "../data/database.js"
import { generateRandomId, isValidMessagePublic } from "../functions.js"

// konfigurationer.
const router = express.Router()
const db = getDb()

// routs för allmänt Kanalen.
// Get
router.get("/allmant", async (req, res) => {
  await db.read()
  const allmantChannel = db.data.public.find(channel => channel.title === "Allmänt")
  if (allmantChannel) {
    res.send(allmantChannel.messages)
  } else {
    res.sendStatus(204, "Det finns ingen medelande i kannalen")
  }
})

// Post
router.post("/allmant", async (req, res) => {
  let maybeMessage = req.body

  if(isValidMessagePublic(maybeMessage)) {
    await db.read()
    maybeMessage.id = generateRandomId()
    const allmantChannel = db.data.public.find(channel => channel.title === "Allmänt")
    allmantChannel.messages.push(maybeMessage)
    await db.write()
    res.send({ id: maybeMessage.id })
  } else {
    res.sendStatus(400)
  }

})

//  -----------------------------------

// routs för Random Kanalen
// Get: Hämtar alla medelanden från Random kanalen.
router.get("/random", async (req, res) => {
  await db.read()
  const RandomChannel = db.data.public.find(channel => channel.title === "Random")
  if (RandomChannel) {
    res.send(RandomChannel.messages)
  } else {
    res.sendStatus(204, "Det finns ingen medelande i kannalen")
  }
})


// Post: Skickar ett medelande till Random kanalen.
router.post("/random", async (req, res) => {
  let maybeMessage = req.body

  if(isValidMessagePublic(maybeMessage)) {
    await db.read()
    maybeMessage.id = generateRandomId()
    const RandomChannel = db.data.public.find(channel => channel.title === "Random")
    RandomChannel.messages.push(maybeMessage)
    await db.write()
    res.send({ id: maybeMessage.id })
  } else {
    res.sendStatus(400)
  }

})

export default router