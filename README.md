# RetroOlympics.github.io

## Running the site locally

### Windows
* Install Python from the Microsoft Store
* Navigate to the folder of the site on your computer in the terminal
* Start a web server using the terminal with `python -m http.server`
* Navigate to http://localhost:8000 in your web browser

## To Do List

Index:

- Adjust colouring of the FAQ  - VOICE

Teams:

- Track teams knocked out in JSON data, add group for past teams with knocked out dates, sorted by most recently knocked out - BUG

Standings:

- Generate standings from results stored in schedule.json - BUG

Schedule:

- Remove seconds from start times
- Signify play-in teams with tooltip explaining
- Link to game challenge in result section
- Show team card on hover
- Show game card on hover

Games:

- Add link to the leaderboard if the game has one

Refactoring:

- Abstract out table css used in standings/schedule - BUG
- Redo colors in tables
