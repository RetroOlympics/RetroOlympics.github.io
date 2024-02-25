"use strict";

const groups = await fetch("json/teams.json").then(res => res.json());
const allgames = await fetch("json/games.json").then(res => res.json());
const schedule = await fetch("json/schedule.json", { cache: "no-cache" }).then(res => res.json());

function renderSlot(week, slot, time) {
    let output = "";
    const teams = [];
    if (slot.team1.hasOwnProperty("group")) {
        teams[0] = groups[slot.team1.group][slot.team1.n - 1];
    } else {
        teams[0] = groups[slot.group][slot.team1 - 1];
    }
    if (slot.team2.hasOwnProperty("group")) {
        teams[1] = groups[slot.team2.group][slot.team2.n - 1];
    } else {
        teams[1] = groups[slot.group][slot.team2 - 1];
    }

    // this sucks, fix this
    const wins = slot.results.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let winner = 0;
    if (wins.get(1) == undefined && wins.get(2) == undefined) {
        winner = 0
    } if (wins.get(1) > wins.get(2) || (wins.get(1) && wins.get(2) == undefined)) {
        winner = 1;
    } else if (wins.get(2) > wins.get(1) || (wins.get(2) && wins.get(1) == undefined)) {
        winner = 2;
    }

    const games = slot.hasOwnProperty("games") ?
        slot.games.map(game => game.hasOwnProperty("week") ?
            allgames.find(gr => gr.groupname === game.week).games[game.n - 1] :
            {
                "name": "?",
                "image": "img/qblock.png",
            }
        ) :
        allgames.find(gr => gr.groupname === week.name).games;

    output += `<div class="row">
        <div class="time" data-time="${time.toISOString()}">
            ${Intl.DateTimeFormat([], { timeStyle: "short" }).format(time)}
        </div>
        <div class="group"><a href="/teams.html?group=${slot.group}">Group ${slot.group}</a></div>
    `;

    output += `<div class="matchup">`;
    if (teams[1] == undefined) {
        output += `
            <div class="matchup-team">
                <img class="icon" title="${teams[0].name}" src="${teams[0].icon}">
                <a href="/teams.html?group=${slot.group}&team=${slot.team1 - 1}" class="winner">
                    ${teams[0].name}
                </a>
            </div>
            <div class="matchup-exhibition">Exhibition Match</div>
        `;
    } else {
        output += `
            <div class="matchup-team">
                <img class="icon" title="${teams[0].name}" src="${teams[0].icon}">
                <a href="/teams.html?group=${slot.group}&team=${slot.team1 - 1}" ${winner == 1 ? `class="winner"`:""}>
                    ${teams[0].name}
                </a>
            </div>
            <div class="matchup-vs"><hr>vs<hr></div>
            <div class="matchup-team">
                <img class="icon" title="${teams[1].name}" src="${teams[1].icon}">
                <a href="/teams.html?group=${slot.group}&team=${slot.team2 - 1}" ${winner == 2 ? `class="winner"`:""}>
                    ${teams[1].name}
                </a>
                ${slot.rolled ? `<span class="rolled" title="Team is defending only and will not receive points for this match">*</span>` : ""}
            </div>
        `;
    }
    output += `</div><div class="results">`;

    for (let i = 0; i < 3; i++) {
        const alt = games[i].name;
        output += `
            <a href="/games.html?week=${week.num + 1}&game=${i + 1}">
                <img class="game" alt="${alt}" title="${alt}" src="${games[i].image}">
            </a>
        `;
    }

    for (let i = 0; i < 3; i++) {
        const res = slot.results[i];
        const icon = res == 0 ? "img/unown.png" : res == 1 ? teams[0].icon : teams[1].icon;
        const alt = res != 0 ? teams[res - 1].name : "?";
        output += `<img class="icon" alt="${alt}" title="${alt}" src="${icon}">`;
    }

    output += "</div>";
    output += `
        <label class="expand">
            <input type="checkbox">
            <i class="bx bx-plus"></i>
        </label>
    `;
    output += `<div class="details">`;

    for (const [index, match] of Object.entries(slot.details)) {
        output += `<div class="details-match">`;
        output += `<img class="details-img" src="${games[index].image}">`
        if (Object.keys(match).length == 0) {
            output += `<div class="details-user"></div>`
        } else if (match.users.length == 1) {
            output += `
                <div class="details-user">
                    <ra-userpic>${match.users[0]}</ra-userpic>
                    ${match.users[0].length != 0 ? `<a href="https://retroachievements.org/user/${match.users[0]}">${match.users[0]}</a>` : ""}
                </div>
            `;
            if (match.results[0].length != 0) {
                output += `<p>${match.results[0]}</p>`;
            }
        } else {
            output += `
                <div class="details-user">
                    <ra-userpic>${match.users[0]}</ra-userpic>
                    ${match.users[0].length != 0 ? `<a href="https://retroachievements.org/user/${match.users[0]}">${match.users[0]}</a>` : ""}
                    ${slot.results[index] == 1 ? "<span>🏆</span>" : ""}
                </div>
            `;
            if (match.results[0].length != 0) {
                output += `<p>${match.results[0]}</p>`;
            }
            output += `
                <div class="matchup-vs"><hr>vs<hr></div>
                <div class="details-user">
                    <ra-userpic>${match.users[1]}</ra-userpic>
                    ${match.users[1].length != 0 ? `<a href="https://retroachievements.org/user/${match.users[1]}">${match.users[1]}</a>` : ""}
                    ${slot.results[index] == 2 ? "<span>🏆</span>" : ""}
                </div>
            `;
            if (match.results[1].length != 0) {
                output += `<p>${match.results[1]}</p>`;
            }
        }
        output += "</div>";
    }
    output += `</div></div>`;
    return output;
}

let output = "";
for (const [index, week] of schedule.entries()) {
    week.num = index;
    const date = new Date(`${week.date}T${week.start}Z`);
    output += `<div class="schedule"><div class="header"><h3>${week.name}</h3>${date.toDateString()}`;
    if (week.timeslots.length == 0) {
        output += `<span class="right">TBD</span></div></div>`;
        continue;
    } else {
        output += `
            <div class="timezone right">
                <label>
                    <input type="checkbox">
                    <span class="local"></span>
                    <span class="utc"></span>
                </label>
            </div>
            </div><div class="table">
            <div class="table-head">
                <span class="head">Time</span>
                <span class="head">Group</span>
                <span class="head">Matchup</span>
                <span class="head">Results</span>
                <span class="head">Details</span>
            </div>
            <div class="more-left">←</div>
            <div class="table-data">
        `;
    }
    let time = new Date(date);
    for (const slot of week.timeslots) {
        output += renderSlot(week, slot, time);
        time = new Date(time.getTime() + 1800000);
    }
    output += `</div><div class="more-right">→</div></div></div>`;
}
document.getElementById("schedule-container").innerHTML = output;

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
