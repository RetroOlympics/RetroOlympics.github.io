"use strict";

const container = document.getElementById("teams-container");
const groups = await fetch("/json/teams.json").then(res => res.json());
let output = "";

for (const [group, teams] of Object.entries(groups)) {
    output += `<div id="group${group}" class="teamgroup"><h1>Group ${group}</h1><div class="teams">`;
    for (const team of teams) {
        output += `<div class="card">
            <div class="card-front">
                <img src="${team.image}">
                <h1>${team.name}</h1>
            </div>
            <div class="card-back">
                <img src="${team.icon}">
                <h2>${team.name}</h2>
                <div class="teamlist">
        `;
        for (const user of team.members) {
            output += `<div class="user"><ra-userpic>${user}</ra-userpic><p>${user}</p></div>`;
        }
        output += "</div></div></div>";
    }
    output += "</div></div>";
}

container.innerHTML = output;

const url = new URL(window.location.href);
if (url.searchParams.has("group")) {
    const group = document.getElementById(`group${url.searchParams.get("group")}`).children[1];
    if (url.searchParams.has("team")) {
        const team = group.children[url.searchParams.get("team")];
        team.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => { team.classList.add("active"); }, 1000);
        document.body.addEventListener("mousedown", () => {
            team.classList.remove("active");
        }, { once: true })
    } else {
        group.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
