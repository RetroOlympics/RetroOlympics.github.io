"use strict";

const container = document.getElementById("schedule-container");
const groups = await fetch("/json/teams.json").then(res => res.json());
const allgames = await fetch("/json/games.json").then(res => res.json());
const schedule = await fetch("/json/schedule.json", { cache: "no-cache" }).then(res => res.json());
let output = "";

for (const [weeknum, week] of schedule.entries()) {
    const date = new Date(`${week.date}T17:00Z`).toDateString();
    output += `<div class="schedule"><div class="header"><h3>${week.name}</h3>${date}`;
    if (week.timeslots.length == 0) {
        output += `<span class="right">TBD</span></div></div>`;
        continue;
    } else {
        output += `
            <div class="timezone right">
                <input type="checkbox" id="timezone${weeknum}">
                <label for="timezone${weeknum}">
                    <span>Localtime</span>
                    <span>UTC</span>
                </label>
            </div>
            </div><div class="table">
            <div class="table-head">
                <span class="head">Hosts</span>
                <span class="head">Time</span>
                <span class="head">Group</span>
                <span class="head">Matchup</span>
                <span class="head">Results</span>
            </div>
            <div class="more-left">←</div>
            <div class="table-data">
        `;
    }
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
            <div class="time" data-time="${week.date}T${slot.time}Z">
                ${Intl.DateTimeFormat([], { timeStyle: "short" }).format(new Date(`${week.date}T${slot.time}Z`))}
            </div>
            <div class="group"><a href="/teams.html?group=${slot.group}">Group ${slot.group}</a></div>
            <div class="matchup">
                <div class="matchup-team">
                    <img class="icon" title="${teams[0].name}" src="${icons[1]}">
                    <a href="/teams.html?group=${slot.group}&team=${slot.team1 - 1}">${teams[0].name}</a>
                </div>
                <div class="matchup-vs"><hr>vs<hr></div>
                <div class="matchup-team">
                    <img class="icon" title="${teams[1].name}" src="${icons[2]}">
                    <a href="/teams.html?group=${slot.group}&team=${slot.team2 - 1}">${teams[1].name}</a>
                    ${slot.rolled ? `<span class="rolled" title="Team is defending only and will not receive points for this match">*</span>` : ""}
                </div>
            </div>
            <div class="results">
        `;
        for (let i = 0; i < 3; i++) {
            const alt = games[i].name;
            output += `
                <a href="/games.html?week=${weeknum + 1}&game=${i + 1}">
                    <img class="game" alt="${alt}" title="${alt}" src="${games[i].image}">
                </a>
            `;
        }
        for (let i = 0; i < 3; i++) {
            const res = slot.results[i];
            const alt = res != 0 ? teams[res - 1].name : "?";
            output += `<img class="icon" alt="${alt}" title="${alt}" src="${icons[res]}">`;
        }
        output += "</div></div>";
    }
    output += `</div><div class="more-right">→</div></div></div>`;
}

container.innerHTML = output;

for (const table of document.querySelectorAll(".schedule .table")) {
    const data = table.querySelector(".table-data")
    const left = table.querySelector(".more-left");
    const right = table.querySelector(".more-right");
    const width = 20;

    const setWidths = (el) => {
        const distR = el.scrollWidth - (el.offsetWidth + el.scrollLeft);
        left.style.width = `${Math.min(width, el.scrollLeft)}px`;
        right.style.right = `${Math.min(0, (distR - width))}px`;
    }

    setWidths(data);

    data.addEventListener("scroll", (ev) => {
        setWidths(ev.target);
    });
}

for (const checkbox of document.querySelectorAll(`.schedule .header .timezone input[type="checkbox"]`)) {
    checkbox.addEventListener("change", () => {
        const schedule = checkbox.closest(".schedule");
        for (const time of schedule.querySelectorAll(".table .table-data .row .time")) {
            const date = new Date(time.dataset.time);
            if (checkbox.checked) {
                time.innerText = Intl.DateTimeFormat([], { timeZone: "UTC", timeStyle: "short" }).format(date);
            } else {
                time.innerText = Intl.DateTimeFormat([], { timeStyle: "short" }).format(date);
            }
        }
    });
}
