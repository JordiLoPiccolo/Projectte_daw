import type { Canco } from "../../interface/canco";
import { mesReproduccions } from "./mesReproduccions";

let botoEnReproduccio: HTMLButtonElement | null = null;

export function crearBotoPlay(canco: Canco, reproduccionsTd: HTMLTableCellElement): HTMLButtonElement {

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Play";
    button.addEventListener("click", () => {

        if (button.textContent === "Play") {
            if (botoEnReproduccio !== null) {
                botoEnReproduccio.textContent = "Play";
            }
            canco.reproduccions = mesReproduccions(canco.reproduccions);
            reproduccionsTd.textContent = canco.reproduccions.toString();
            button.textContent = "Playing";
            botoEnReproduccio = button;
        } else {
            button.textContent = "Play";
            botoEnReproduccio = null;
        }
    });
    return button
}