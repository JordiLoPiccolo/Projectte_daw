import type { Canco } from "../../interface/canco";
import { mesReproduccions } from "./mesReproduccions";

export function crearBotoPlay(canco: Canco, reproduccionsTd: HTMLTableCellElement): HTMLButtonElement {

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Play";
    button.addEventListener("click", () => {

        if (button.textContent === "Play") {
            canco.reproduccions = mesReproduccions(canco.reproduccions);
            reproduccionsTd.textContent = canco.reproduccions.toString();
            button.textContent = "Playing"
        } else {
            button.textContent = "Play"
        }
    });
    return button
}