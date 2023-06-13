//imports
import express from "express"
import { getDb } from "../data/database.js"
import { generateRandomId, isValidMessage } from "../functions.js"

// konfigurationer.
const router = express.Router()
const db = getDb()

// Get
router.get("/", async (req, res) => {
  await db.read()
  res.send(db.data.public)
})

// Post
router.post("/", async (req, res) => {
  let maybeMessage = req.body

  if(isValidMessage(maybeMessage)) {
    await db.read()
    maybeMessage.id = generateRandomId()
    db.data.public.push(maybeMessage)
    await db.write()
    res.send({ id: maybeMessage.id })
  } else {
    res.sendStatus(400)
  }

})

export default router