"use strict";

const container = document.getElementById("games-container");
const games = await fetch("/json/games.json").then(res => res.json());
let output = "";

for (const group of games) {
    output += `<div class="gamegroup"><h1>${group.groupname}</h1>`;
    for (const game of group.games) {
        let challenge = typeof game.challenge === "string" ? game.challenge : game.challenge.join(" ");
        output += `<div class="card">
            <div class="card-front">
                <img src="${game.image}">
                <h1>${game.name}</h1>
            </div>
            <div class="card-back">
                <div class="card-links">
                    ${game.type === "ra" ? `
                        <img src="${game.console}" class="console pixel">
                        <a href="https://retroachievements.org/game/${game.ra_id}">
                            <img src="img/raicon.png">
                        </a>
                        ${game.ra_save !== undefined ? `
                            <a href="${game.ra_save}">
                                <img src="img/save.png">
                            </a>
                        `:""}
                    ` : `
                        <img src="${game.console}" class="console">
                    `}
                </div>
                <div class="card-info">
                    <p>${challenge}</p>
                    ${game.type === "ra" ? `<p class="card-hash">${game.ra_hash}</p>` : ""}
                </div>
            </div>
        </div>
        `;
    }
    output += "</div>";
}

container.innerHTML = output;
