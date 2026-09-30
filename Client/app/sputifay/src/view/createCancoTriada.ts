import type { Canco } from "../interface/canco";

export function createCancoTriada(canco: Canco): HTMLDivElement {


    const card: HTMLDivElement = document.createElement("div");

    const titol: HTMLDivElement = document.createElement("p");
    titol.textContent = "Titol: " + canco.titol;

    const artista: HTMLDivElement = document.createElement("p");
    artista.textContent = "Artista: " + canco.artista;

    const xdiv: HTMLDivElement = document.createElement("div");
    xdiv.textContent = "X"
    card.appendChild(titol);
    card.appendChild(artista);
    card.appendChild(xdiv);

    xdiv.addEventListener("click", () => {
        card.innerHTML = " ";
    })

    return card;
}