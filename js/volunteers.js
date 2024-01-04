const volunteers = {
    "voiceofautumn": "Host & Jack-Of-All-Trades",
    "Searo": "Co-Host & Leaderboard Developer",
    "starblades": "Shoutcaster & Media",
    "StingX2": "Shoutcaster",
    "TimeCrush": "Shoutcaster",
    "Wimpyfox": "Shoutcaster",
    "wolfman2000": "Shoutcaster",
    "RaphMec": "Shoutcaster",
    "freezestar": "Shoutcaster",
    "Pampa50": "Referee",
    "soltyd": "Referee",
    "Amir96lx": "Referee",
    "coolscribble": "Referee",
    "Nickyy": "Referee",
    "Bartis1989": "Leaderboard Developer",
    "Bryan1150": "Leaderboard Developer",
    "clymax": "Leaderboard & Web Developer",
    "drisc": "Web Developer",
    "MonkeyBug": "Web Developer",
    "Nabas6545": "Media Producer",
    "Tayadaoc": "Media Producer",
};

const container = document.getElementById("volunteers-container");
const wheel = document.createElement("div");
wheel.classList.add("wheel");
wheel.style.setProperty("--n", Object.keys(volunteers).length.toString());

let active = null;

for (const [index, [user, desc]] of Object.entries(Object.entries(volunteers))) {
    const icon = document.createElement("div");
    icon.classList.add("icon");
    icon.style.setProperty("--i", index.toString());
    icon.innerHTML = `<img src="https://media.retroachievements.org/UserPic/${user}.png">`;

    const card = document.createElement("div")
    card.classList.add("card");
    card.innerHTML = `
        <ra-userpic>${user}</ra-userpic>
        <div class="text">
            <a href="https://retroachievements.org/user/${user}">${user}</a>
            ${desc}
        </div>
    `;

    icon.firstChild.addEventListener("mouseenter", () => {
        if (active !== null) {
            active.classList.remove("active");
        }
        card.classList.add("active");
        active = card;
    });

    wheel.append(icon, card);
}

container.appendChild(wheel);

// randomizer
const n = Math.floor(Math.random() * Object.keys(volunteers).length);
const card = document.querySelectorAll(".card")[n];
card.classList.add("active");
active = card;
