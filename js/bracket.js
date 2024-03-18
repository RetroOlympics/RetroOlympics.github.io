const groups = await fetch("json/teams.json").then(res => res.json());
const knockouts = await fetch("json/knockouts.json", { cache: "no-cache" }).then(res => res.json());

export function renderBracket(showIcons, showNames) {
    let output = `<div class="bracket">`;

    for (let [i, slot] of Object.entries(knockouts[0].timeslots)) {
        const teams = [
            groups[slot.team1.group][slot.team1.n - 1],
            groups[slot.team2.group][slot.team2.n - 1]
        ]
        output += `
            <div class="matchup" style="grid-row-start: ${(i * 2) + 1}">
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[0].name}" src="${teams[0].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[0].name}</p>
                </div>
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[1].name}" src="${teams[1].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[1].name}</p>
                </div>
            </div>
        `;
    }

    for (let [i, slot] of Object.entries(knockouts[1].timeslots)) {
        const index = (i * 4) + 1;
        output += `
            <div class="line line-ne" style="grid-area: ${index}/2/${index}/2"></div>
            <div class="line line-te" style="grid-area: ${index + 1}/2/${index + 1}/2"></div>
            <div class="line line-se" style="grid-area: ${index + 2}/2/${index + 2}/2"></div>
            <div class="matchup quarters" style="grid-row-start: ${index}">
        `;

        if (slot.hasOwnProperty("team1")) {
            const teams = [
                groups[slot.team1.group][slot.team1.n - 1],
                groups[slot.team2.group][slot.team2.n - 1]
            ]
            output += `
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[0].name}" src="${teams[0].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[0].name}</p>
                </div>
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[1].name}" src="${teams[1].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[1].name}</p>
                </div>
            </div>`;
        } else {
            output += `
                <div class="team unknown">?</div>
                <div class="team unknown">?</div>
            </div>`;
        }
    }

    for (let [i, slot] of Object.entries(knockouts[2].timeslots)) {
        const index = (i * 8) + 1;
        output += `
            <div class="line line-ne" style="grid-area: ${index + 1}/4/${index + 1}/4"></div>
            <div class="line line-v"  style="grid-area: ${index + 2}/4/${index + 2}/4"></div>
            <div class="line line-te" style="grid-area: ${index + 3}/4/${index + 3}/4"></div>
            <div class="line line-v"  style="grid-area: ${index + 4}/4/${index + 4}/4"></div>
            <div class="line line-se" style="grid-area: ${index + 5}/4/${index + 5}/4"></div>
            <div class="matchup semis" style="grid-row-start: ${index}">
        `;

        if (slot.hasOwnProperty("team1")) {
            const teams = [
                groups[slot.team1.group][slot.team1.n - 1],
                groups[slot.team2.group][slot.team2.n - 1]
            ]
            output += `
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[0].name}" src="${teams[0].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[0].name}</p>
                </div>
                <div class="team">
                    <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[1].name}" src="${teams[1].icon}">
                    <p class="${showNames ? "" : "hidden"}">${teams[1].name}</p>
                </div>
            </div>`;
        } else {
            output += `
                <div class="team unknown">?</div>
                <div class="team unknown">?</div>
            </div>`;
        }
    }

    output += `
        <div class="line line-ne" style="grid-area: 4/6/4/6"></div>
        <div class="line line-v"  style="grid-area: 5/6/7/6"></div>
        <div class="line line-te" style="grid-area: 7/6/7/6"></div>
        <div class="line line-v"  style="grid-area: 8/6/8/6"></div>
        <div class="line line-te" style="grid-area: 9/6/9/6"></div>
        <div class="line line-v"  style="grid-area: 10/6/12/6"></div>
        <div class="line line-se" style="grid-area: 12/6/12/6"></div>
    `;

    for (let [i, slot] of Object.entries(knockouts[3].timeslots)) {
        if (slot.hasOwnProperty("team1")) {
            const teams = [
                groups[slot.team1.group][slot.team1.n - 1],
                groups[slot.team2.group][slot.team2.n - 1]
            ]
            output += `
                <div class="matchup finals${parseInt(i) + 1}">
                    <div class="team">
                        <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[0].name}" src="${teams[0].icon}">
                        <p class="${showNames ? "" : "hidden"}">${teams[0].name}</p>
                    </div>
                    <div class="team">
                        <img class="icon ${showIcons ? "" : "hidden"}" title="${teams[1].name}" src="${teams[1].icon}">
                        <p class="${showNames ? "" : "hidden"}">${teams[1].name}</p>
                    </div>
                </div>
            `;
        } else {
            output += `
                <div class="matchup finals${parseInt(i) + 1}">
                    <div class="team unknown">?</div>
                    <div class="team unknown">?</div>
                </div>
            `;
        }
    }

    output += "</div>";
    return output;
}
