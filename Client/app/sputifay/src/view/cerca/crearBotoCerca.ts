export function crearBotoCerca(
    getValueSearch: () => string,
    cercar: (textABuscar: string) => void): HTMLButtonElement {

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Cerca";
    button.addEventListener("click", () => {
        cercar(getValueSearch());
    });
    return button
}