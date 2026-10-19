// Mock data for today's activity.
// This is just an array in memory, so anything you add, change, or delete
// resets every time the server restarts (including every time nodemon reloads).

export const songs = [
    { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'rock', year: 1975, plays: 1520 },
    { id: 2, title: 'Billie Jean', artist: 'Michael Jackson', genre: 'pop', year: 1982, plays: 1340 },
    { id: 3, title: 'Smells Like Teen Spirit', artist: 'Nirvana', genre: 'rock', year: 1991, plays: 980 },
    { id: 4, title: 'Juicy', artist: 'The Notorious B.I.G.', genre: 'hip-hop', year: 1994, plays: 870 },
    { id: 5, title: 'Hey Ya!', artist: 'OutKast', genre: 'hip-hop', year: 2003, plays: 1105 },
    { id: 6, title: 'Rolling in the Deep', artist: 'Adele', genre: 'pop', year: 2010, plays: 1250 },
    { id: 7, title: 'So What', artist: 'Miles Davis', genre: 'jazz', year: 1959, plays: 410 },
    { id: 8, title: 'Blinding Lights', artist: 'The Weeknd', genre: 'pop', year: 2019, plays: 1890 },
    { id: 9, title: 'Take Five', artist: 'Dave Brubeck Quartet', genre: 'jazz', year: 1959, plays: 365 },
    { id: 10, title: 'HUMBLE.', artist: 'Kendrick Lamar', genre: 'hip-hop', year: 2017, plays: 1420 }
]

// Only needed for Challenge C10
export const playlists = [
    { id: 1, name: 'Study Session', songIds: [7, 9, 6] },
    { id: 2, name: 'Gym', songIds: [10, 4, 3, 8] }
]
