"use strict";

const container = document.querySelector("main");
const groups = await fetch("json/teams.json", { cache: "no-cache" }).then(res => res.json());
const schedule = await fetch("json/schedule.json", { cache: "no-cache" }).then(res => res.json());
let output = "";

const ranks = [ "1st", "2nd", "3rd", "4th" ];

for (const [group, teams] of Object.entries(groups)) {
    output += `<div class="group"><div class="header">Group ${group}</div>
        <div class="table">
            <div class="row head">
                <span>Rank</span>
                <span>Team</span>
                <span>Points</span>
            </div>
    `;

    const scores = [
        { n: 0, team: 0 },
        { n: 0, team: 1 },
        { n: 0, team: 2 },
        { n: 0, team: 3 },
    ];
    for (const week of schedule) {
        for (const slot of week.timeslots) {
            if (slot.group == group) {
                let points = [0, 0];
                for (const result of slot.results) {
                    if (result == 0) {
                        continue;
                    } else {
                        points[result - 1] += 1;
                    }
                }
                if (points[0] > points[1]) {
                    scores[slot["team1"] - 1].n += 3;
                } else if (points[1] > points[0]) {
                    scores[slot["team2"] - 1].n += 3;
                }
            }
        }
    }
    scores.sort((a, b) => b.n - a.n);

    let nextRank = -1;
    let prevScore = Number.MAX_VALUE;
    for (const score of scores) {
        const team = teams[score.team];
        if (team.name === "") {
            continue;
        }
        if (score.n < prevScore) {
            prevScore = score.n;
            nextRank += 1;
        }
        output += `<div class="row"><div class="rank">${ranks[nextRank]}</div>
            <div class="team">
                <img class="icon" src="${team.icon}" alt="${team.name}">
                <a href="/teams.html?group=${group}&team=${score.team}">
                    ${team.name}
                </a>
            </div>
            <div class="points">${score.n}</div>
        </div>`;
    }

    output += "</div></div>";
}

container.innerHTML = output;
