import express from 'express'
import { songs, playlists } from './data.js'

const app = express()
const port = 3000

// TODO (Part 3): add the middleware that parses JSON request bodies


// ---------------- Part 0 ----------------

// TODO 0.1: GET /  ->  "Welcome to the Music Library API"


// ---------------- Part 1: GET ----------------

// TODO 1.1: GET /songs  ->  all songs

// TODO 1.2: GET /songs/:id  ->  one song, or 404


// ---------------- Part 2: query params ----------------

// TODO 2.1 / 2.2: go back and update GET /songs to handle ?genre, ?minYear, ?maxYear

// TODO 2.3: GET /songs/top?limit=3  (read the README before you put this one in)


// ---------------- Part 3: POST / PUT / DELETE ----------------

// TODO 3.1: POST /songs

// TODO 3.2: PUT /songs/:id

// TODO 3.3: DELETE /songs/:id


// ---------------- Challenges ----------------
// Put challenge code wherever it makes sense. Some of it (like the 404 handler)
// has to go in a specific spot to work.


app.listen(port, () => {
    console.log(`Music Library API running at http://localhost:${port}`)
})
