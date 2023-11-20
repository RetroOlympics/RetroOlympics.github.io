"use strict";

const container = document.getElementById("schedule-container");
const schedule = await fetch("/json/schedule.json").then(res => res.json());
let output = "";

for (const week of schedule) {
    const date = new Date(`${week.date}T${week.timeslots[0].time}Z`).toDateString();
    output += `<div class="schedule"><div class="header"><span>${week.name}</span>${date}</div>`;
    output += `<div class="table">
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
    for (const slot of week.timeslots) {
        output += `<div class="row">
            <div class="hosts"><ra-userpic></ra-userpic></div>
            <div class="time">
                ${new Date(`${week.date}T${slot.time}Z`).toLocaleTimeString()}
            </div>
            <div class="group">Group ${slot.group}</div>
            <div class="matchup">
                <div class="matchup-team"><img class="icon" title="TBA" src="img/unown.png"><span>TBA</span></div>
                <div class="matchup-vs"><hr>vs<hr></div>
                <div class="matchup-team"><img class="icon" title="TBA" src="img/unown.png"><span>TBA</span></div>
            </div>
            <div class="results">
                <img class="game empty" alt="TBA" title="TBA" src="img/qblock.png">
                <img class="game empty" alt="TBA" title="TBA" src="img/qblock.png">
                <img class="game empty" alt="TBA" title="TBA" src="img/qblock.png">
                <img class="icon" alt="TBA" title="TBA" src="img/unown.png">
                <img class="icon" alt="TBA" title="TBA" src="img/unown.png">
                <img class="icon" alt="TBA" title="TBA" src="img/unown.png">
            </div>
        </div>
        `;
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
