import type { Canco } from "../../interface/canco";
import { mesReproduccions } from "./mesReproduccions";
let jugant: string = "playing";
let parat: string = "play";

export function crearBotoPlay(canco: Canco,botoEnReproduccio:HTMLButtonElement | null): HTMLButtonElement {

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";

    let playing: boolean = false;

  

    button.addEventListener("click", () => {

     
        if (!playing) {
            if (botoEnReproduccio !== null) {
                botoEnReproduccio.textContent = parat;
            }
            mesReproduccions(canco);
            playing = true;
            botoEnReproduccio = button;
            button.textContent = jugant;
        } else {
            playing = false;
            botoEnReproduccio = null;
            button.textContent = parat;
        }
    });
    return button
}