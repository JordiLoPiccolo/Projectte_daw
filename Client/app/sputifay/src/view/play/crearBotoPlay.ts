export function crearBotoPlay() {

    let reproduccions: number = 0;
    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "Play";
    button.addEventListener("click", () => {
       
        if (button.textContent === "Play") {
            reproduccions++;
            button.textContent = "Playing"
        } else {
            button.textContent = "Play"
        }
    });
    return button
}