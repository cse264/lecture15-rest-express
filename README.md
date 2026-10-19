# Lecture 15 In-Class Activity: Music Library API

**CSE 264 · REST + Express**

Today you're building a small REST API for a music library with Node.js and Express. It's the same pattern as the `users` API from lecture, but with a different resource, so you'll have to think through each route instead of copying.

We'll do Part 0 and Part 1 together on the board. After that, keep going on your own or with the person next to you. The challenges at the bottom are for when you finish the main parts. Get as far as you can and push what you have before you leave.

There's no database yet. The data lives in an array in `data.js`, so anything you add, change, or delete resets every time nodemon restarts the server. That's expected.

## What's in this repo

| File | What it is |
| --- | --- |
| `app.js` | Your server. Mostly TODOs right now. |
| `data.js` | Mock data: 10 songs and 2 playlists. |
| `package.json` | Project config and the list of packages to install (Express, nodemon). |
| `.gitignore` | Keeps `node_modules` out of your repo. Don't delete it. |

## Before you start

- Node 18 or newer (`node -v` to check). Express 5 won't run on anything older.
- Something that can send POST, PUT, and DELETE requests. The browser address bar can only do GET. Postman, the Thunder Client extension for VS Code, or `curl` all work.

---

## Part 0: Setup (together)

Clone the repo, `cd` into it, then install the packages:

```bash
npm install
```

This reads `package.json` and downloads Express and nodemon into a `node_modules` folder. `node_modules` is never committed (it's huge, and `.gitignore` keeps it out), so any time you clone a Node project, `npm install` is the first thing you run.

Open `package.json` and find the two things we set up by hand in lecture:

- `"type": "module"` lets us use `import` instead of `require`.
- The `dev` script runs the server with nodemon, which restarts it every time you save.

```json
"type": "module",
"scripts": {
  "dev": "nodemon app.js",
  "start": "node app.js"
}
```

Start the server:

```bash
npm run dev
```

**0.1** In `app.js`, add a `GET /` route that sends back `Welcome to the Music Library API`.

Open http://localhost:3000. If you see your message, you're set. If the terminal says `Cannot find package 'express'`, you skipped `npm install`.

---

## Part 1: Reading data with GET (together)

**1.1** `GET /songs` returns every song as JSON.

**1.2** `GET /songs/:id` returns one song. If no song has that id, send a `404` with a message.

> Anything in `req.params` comes in as a string. `"3" === 3` is `false`.

Check yourself:

- http://localhost:3000/songs → all 10 songs
- http://localhost:3000/songs/8 → Blinding Lights
- http://localhost:3000/songs/42 → 404

---

## Part 2: Query parameters (your turn)

From here on, you're driving.

**2.1** Update `GET /songs` so it takes an optional `genre` query parameter. Matching should be case-insensitive. With no `genre`, it returns everything like before.

```
/songs?genre=jazz       → 2 songs
/songs?genre=HIP-HOP    → 3 songs
```

**2.2** Add optional `minYear` and `maxYear` to the same route. They should work on their own and combined with `genre`.

```
/songs?minYear=2000                   → 4 songs
/songs?minYear=1980&maxYear=1999      → 3 songs
/songs?genre=pop&minYear=2000         → 2 songs
```

**2.3** Add `GET /songs/top`, which returns the most-played songs, highest first. It takes an optional `limit` that defaults to 5.

```
/songs/top            → 5 songs, Blinding Lights first
/songs/top?limit=2    → Blinding Lights, Bohemian Rhapsody
```

Here's the catch: **write this route below your `/songs/:id` route** and test it. It won't work. Figure out what Express is doing, then fix it. (What does Express think `:id` is when you visit `/songs/top`?)

> Careful with `.sort()`. It sorts the array in place, so you'd be reordering your actual data. Sort a copy instead.

---

## Part 3: Creating, updating, deleting (your turn)

You can't test these from the address bar. Switch to Postman, Thunder Client, or curl.

First, remember the middleware we forgot in lecture? Without it, `req.body` is `undefined`. Add this near the top of `app.js`:

```js
app.use(express.json())
```

**3.1** `POST /songs` creates a song. `title`, `artist`, `genre`, and `year` are required, and if any are missing you send a `400`. New songs start with `plays: 0`. Give it the next id the same way we did in lecture (we'll come back to that). Respond with `201` and the new song.

**3.2** `PUT /songs/:id` updates a song with whatever fields are in the body. `404` if the song doesn't exist.

**3.3** `DELETE /songs/:id` removes a song and sends back the one you deleted. `404` if it doesn't exist.

Run through this sequence. Don't save `app.js` partway through, or nodemon restarts and your data resets.

1. `POST /songs` with `{"title": "Espresso", "artist": "Sabrina Carpenter", "genre": "pop", "year": 2024}` → `201`, id 11
2. `POST /songs` with `{"title": "Nope"}` → `400`
3. `PUT /songs/11` with `{"plays": 50}` → plays is 50, everything else unchanged
4. `DELETE /songs/11` → sends back Espresso
5. `GET /songs/11` → `404`

With curl, a POST looks like this:

```bash
curl -X POST http://localhost:3000/songs \
  -H "Content-Type: application/json" \
  -d '{"title": "Espresso", "artist": "Sabrina Carpenter", "genre": "pop", "year": 2024}'
```

On Windows, PowerShell's quoting makes this painful. Use Postman or Thunder Client instead.

---

## Challenges

Done with Parts 0–3? Pick from here. They get harder as you go down, but you don't have to do them in order.

### Level 1

**C1. Break the id generator.** Restart the server, then `DELETE /songs/2`, `POST` a new song, and `GET /songs`. Look at the ids. What went wrong with `songs.length + 1`? Fix it so ids never repeat.

**C2. Protect the id.** Send `PUT /songs/1` with `{"id": 99}`, then try `GET /songs/1`. Make it so a PUT can't change a song's id.

**C3. Better validation.** Make `POST /songs` also reject a `year` that isn't a number or isn't between 1900 and the current year. Send errors back as JSON, like `{ "error": "year must be between 1900 and 2026" }`, so a frontend could actually show them to a user.

**C4. A real 404.** Go to a route that doesn't exist, like `/banana`. Express sends back an HTML page. Make every unknown route return JSON instead: `{ "error": "Route not found" }`. (Hint: `app.use(...)` at the very bottom, after all your routes.)

### Level 2

**C5. 400 vs 404.** `GET /songs/abc` probably gives you a 404 right now. But "abc" isn't a song that doesn't exist, it isn't a valid id at all. Return a `400` for ids that aren't positive whole numbers, on every `:id` route. Write a helper function instead of copy-pasting the check.

**C6. PUT vs PATCH.** Look back at the HTTP methods slide: PUT is supposed to update the *entire* resource. Our PUT (and the one from lecture) only changes the fields you send, which is really what PATCH is for. Fix it:

- `PUT /songs/:id` requires all of `title`, `artist`, `genre`, and `year` (`400` otherwise) and replaces the song's fields. It keeps the same id, and keeps its `plays` if the body doesn't include one.
- `PATCH /songs/:id` does the partial update your old PUT did.

**C7. Sorting.** Add `sort` and `order` to `GET /songs`, like `/songs?sort=year&order=desc`. Support `title`, `year`, and `plays`. Default order is ascending. A `sort` value you don't support gets a `400`. It should still work with the Part 2 filters.

**C8. Your own middleware.** Write a logging middleware that prints one line per request:

```
GET /songs/2 200 - 3ms
POST /songs 400 - 1ms
```

(You need the status code, which isn't known until the response is sent. Look up `res.on('finish', ...)`.)

**C9. Is this RESTful?** Add `POST /songs/:id/play`, which bumps a song's `plays` by 1 and returns the song. Then talk it over with your neighbor. The slides say URLs should be nouns and the HTTP method is the action. Does this route follow that? What would a "pure" REST version look like, and is it actually better?

### Level 3

**C10. Nested resources.** `data.js` also exports `playlists`. Each playlist stores an array of song ids. Build:

- `GET /playlists` → all playlists
- `GET /playlists/:id/songs` → the full song objects in that playlist, in order (not just the ids)
- `POST /playlists/:id/songs` with `{"songId": 3}` → adds a song. `404` if the playlist or the song doesn't exist, `400` if it's already in the playlist.
- `DELETE /playlists/:id/songs/:songId` → takes the song out of the playlist (not out of the library)

Then think about this: what should happen to the playlists when someone calls `DELETE /songs/7`? Make it happen.

**C11. Pagination.** Add `page` and `limit` to `GET /songs`. When either one is given, respond with this instead of a bare array:

```json
{ "page": 2, "limit": 3, "total": 10, "results": [ ... ] }
```

`total` is the count *after* filtering. It should all work together with the genre, year, and sort options.

**C12. Split it up.** `app.js` is getting long. Move your song routes into `routes/songs.js` using `express.Router()`, and mount it with `app.use('/songs', songsRouter)`. Inside the router, paths are relative, so `/songs/:id` becomes `/:id`. Everything should work exactly the same afterward.

---

## Before you leave

Commit and push:

```bash
git status
git add .
git commit -m "lecture 15 activity"
git push
```

Check the `git status` output first. If `node_modules` shows up, something happened to your `.gitignore`.

## Quick reference

```js
req.params                 // dynamic parts of the path:  /songs/:id
req.query                  // query string:  ?genre=pop&minYear=2000
req.body                   // JSON body (only works with express.json())

res.json(data)             // send JSON with status 200
res.status(201).json(data) // set the status, then send
res.status(404).send('Song not found')
```

| Code | When to use it today |
| --- | --- |
| `200 OK` | GET, PUT, PATCH, or DELETE worked |
| `201 Created` | POST made a new song |
| `400 Bad Request` | Missing or invalid data from the client |
| `404 Not Found` | That song or route doesn't exist |
