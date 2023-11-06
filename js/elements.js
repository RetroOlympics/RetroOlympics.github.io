class RAUserPic extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const css = `
            :host {
                border-radius: 50%;
                overflow: hidden;
                aspect-ratio: 1 / 1;
            }
            img {
                width: 100%;
                height: 100%;
            }
        `;

        const user = this.innerText;
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        const link = document.createElement("a");
        const img = document.createElement("img");

        style.innerText = css;
        shadow.appendChild(style);

        if (user !== "") {
            link.href = `https://retroachievements.org/user/${user}`;
            img.src = `https://media.retroachievements.org/UserPic/${user}.png`;
        } else {
            link.href = "";
            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
        }

        link.appendChild(img);
        shadow.appendChild(link);
    }
}

window.customElements.define("ra-userpic", RAUserPic);
