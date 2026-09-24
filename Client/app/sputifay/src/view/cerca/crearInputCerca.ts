export function crearInputCerca(): HTMLInputElement{
    const input: HTMLInputElement = document.createElement("input");
    input.id = "cerca";
    input.name = "Cerca";
    input.type = "text";
    input.placeholder = "Busca una canco";
    return input
}
