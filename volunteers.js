const volunteers = {
    "Hosts": [
        "voiceofautumn",
        "Searo",
    ],
    "Stream Team": [
        "starblades",
        "TimeCrush",
        "RaphMec",
        "Wimpyfox",
        "freezestar",
        "Prota",
        "AmazingBaha",
        "theelkspeaks",
        "Homuki",
    ],
    "Referee Team": [
        "Amir96lx",
        "Kiutgh",
        "xClawz",
        "Retrokaiser",
    ],
    "Game Testers": [
        "Adenothe",
        "GalacticSpear",
        "Nickyy",
        "r0ach3d",
        "Tayadaoc",
        "Zexerous",
    ],
    "Leaderboard Devs": [
        "Bartis1989",
        "clymax",
        "s0uth",
        "kmpers",
    ],
    "Web Team": [
        "drisc",
        "MonkeyBug",
        "Daisey",
    ],
    "Media Team": [
        "PrinnyPrinny",
        "ChocoMilk",
        "Nydaxn",
        "TheoVellum",
    ],
    "Event Support": [
        "Zegjita",
    ],
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const container = document.querySelector("main");
let output = "";

for (const [team, members] of Object.entries(volunteers)) {
    output += `<div class="team"><h1>${team}</h1><hr><div class="memberlist">`;
    if (team != "Hosts") {
        shuffle(members);
    }
    for (const member of members) {
        output += `<div class="member"><ra-userpic>${member}</ra-userpic><p>${member}</p></div>`;
    }
    output += `</div></div>`;
}

container.innerHTML = output;
