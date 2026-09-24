export function crearBotoCerca(): HTMLButtonElement{
    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Cerca";
    button.addEventListener("click", () => {
        console.log("Has clickat el botó que et hackeja el pc, felicitats");
    });
    return button
}