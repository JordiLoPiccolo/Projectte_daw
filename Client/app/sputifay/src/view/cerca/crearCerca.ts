import { crearBotoCerca } from "./crearBotoCerca";
import { crearInputCerca } from "./crearInputCerca";

export function crearCerca(cercar:(textABuscar:string) => void): HTMLFormElement {


    const form: HTMLFormElement = document.createElement("form");
    const label: HTMLLabelElement = document.createElement("label");
    const input: HTMLInputElement = crearInputCerca();

    const getValueSearch: () => string = () => { return input.value.trim(); }
    const button: HTMLButtonElement = crearBotoCerca(getValueSearch,cercar);


    label.textContent = "Buscar";
    label.appendChild(input);
    form.appendChild(label);
    form.appendChild(button);
    return form
}