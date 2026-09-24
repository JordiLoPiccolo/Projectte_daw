import { crearBotoCerca } from "./crearBotoCerca";
import { crearInputCerca } from "./crearInputCerca";

export function crearCerca(): HTMLFormElement {


    const form: HTMLFormElement = document.createElement("form");
    const label: HTMLLabelElement = document.createElement("label");
    const input: HTMLInputElement = crearInputCerca();
    const button: HTMLButtonElement = crearBotoCerca();


    label.textContent = "Buscar";
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(button);
    return form
}