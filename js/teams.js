"use strict";

const container = document.getElementById("teams-container");
const groups = await fetch("/json/teams.json").then(res => res.json());
let output = "";

for (const group in groups) {
    output += `<div class="teamgroup"><h1>Group ${group}</h1>`;
    for (const team of groups[group]) {
        output += `<div class="card">
            <div class="card-front">
                <img src="${team.image}">
                <h1>${team.name}</h1>
            </div>
            <div class="card-back">
                <img src="${team.icon}">
                <h1>${team.name}</h1>
                <div class="teamlist">
        `;
        for (const user of team.members) {
            output += `<div class="user">
                <ra-userpic>${user}</ra-userpic><p>${user === "" ? "???" : user}</p>
            </div>`;
        }
        output += "</div></div></div>";
    }
    output += "</div>";
}

container.innerHTML = output;
