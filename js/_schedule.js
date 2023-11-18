"use strict";

const container = document.getElementById("schedule-container");
const groups = await fetch("/json/teams.json").then(res => res.json());
const allgames = await fetch("/json/games.json").then(res => res.json());
const schedule = await fetch("/json/schedule.json").then(res => res.json());
let output = "";

for (const week of schedule) {
    const date = new Date(`${week.date}T${week.timeslots[0].time}Z`).toDateString();
    output += `<div class="schedule"><div class="header"><span>${week.name}</span>${date}</div>`;
    output += `<div class="table">
        <div class="row">
            <span class="head">Hosts</span>
            <span class="head">Time</span>
            <span class="head">Group</span>
            <span class="head">Matchup</span>
            <span class="head">Results</span>
        </div>
    `;
    for (const slot of week.timeslots) {
        const teams = [
            groups[slot.group][slot.team1 - 1],
            groups[slot.group][slot.team2 - 1],
        ];
        const games = allgames.find(gr => gr.groupname === week.name).games;
        const icons = [ "img/unown.png", teams[0].icon, teams[1].icon ];
        output += `<div class="row">
            <div class="hosts">
                <ra-userpic>${slot.hosts[0] !== undefined ? slot.hosts[0] : ""}</ra-userpic>
                ${slot.hosts[1] !== undefined ? `<ra-userpic>${slot.hosts[1]}</ra-userpic>` : ""}
            </div>
            <div class="time">
                ${new Date(`${week.date}T${slot.time}Z`).toLocaleTimeString()}
            </div>
            <div class="group">Group ${slot.group}</div>
            <div class="matchup">
                <div class="matchup-team">
                    <img class="icon" title="${teams[0].name}" src="${icons[1]}">
                    ${teams[0].name}
                </div>
                <div>VS</div>
                <div class="matchup-team">
                    <img class="icon" title="${teams[1].name}" src="${icons[2]}">
                    ${teams[1].name}
                </div>
            </div>
            <div class="results">
        `;
        for (let i = 0; i < 3; i++) {
            const alt = games[i].name;
            output += `<img class="game" alt="${alt}" title="${alt}" src="${games[i].image}">`
        }
        for (let i = 0; i < 3; i++) {
            const res = slot.results[i];
            const alt = res != 0 ? teams[res - 1].name : "?";
            output += `<img class="icon" alt="${alt}" title="${alt}" src="${icons[res]}">`;
        }
        output += "</div></div>";
    }
    output += "</div></div>";
}

container.innerHTML = output;
