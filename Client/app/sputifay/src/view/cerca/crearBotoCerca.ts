export function crearBotoCerca(getValueSearch:() => string): HTMLButtonElement{
    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Cerca";
    button.addEventListener("click", () => {
        console.log("Has buscat: "+getValueSearch());
    });
    return button
}