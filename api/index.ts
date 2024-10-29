import dotenv from 'dotenv'
import express from 'express'
import { wow } from 'blizzard.js'
import morgan from 'morgan'
import logic from './logic/index.ts'
import cors from 'cors'
import jwt from 'jsonwebtoken'

dotenv.config()

const { BLIZZARD_CLIENT_ID, BLIZZARD_CLIENT_SECRET, PORT } = process.env

// mongodb connect if needed

// express app
const api = express()

const jsonBodyParser = express.json()

// Middleware
api.use(morgan('dev'))
api.use(cors())
api.use(jsonBodyParser)

// setup Blizzard API instance
let wowClient

wow.createInstance({
    key: BLIZZARD_CLIENT_ID!,
    secret: BLIZZARD_CLIENT_SECRET!,
    origin: 'eu',
    locale: 'en_GB'
})
    .then((client) => {
        wowClient = client
        console.log('WoW Api client initialized:')
    })
    .catch((error) => {
        console.error('Error initializing WoW Api client', error)
    })


// getCharacterData
api.get('/character/:realm/:characterName', (req, res) => {
    const { realm, characterName } = req.params

    if (!wowClient) {
        return res.status(500).json({ error: 'WoW Api client not initialized' })
    }

    logic.getCharacterData(wowClient, realm, characterName)
        .then((characterData) => res.json(characterData))
        .catch((error) => {
            res.status(500).json('Error fetching character profile', error)
        })
})



// Start server
api.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})