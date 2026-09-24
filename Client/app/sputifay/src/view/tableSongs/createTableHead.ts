export function createTableHead():HTMLTableSectionElement {

    const thead: HTMLTableSectionElement = document.createElement("thead");
    const trhead: HTMLTableRowElement = document.createElement("tr");
    const thTitol: HTMLTableCellElement = document.createElement("th");
    const thDurada: HTMLTableCellElement = document.createElement("th");

    thTitol.textContent = "Titol: ";
    thDurada.textContent = "Durada: ";

    trhead.appendChild(thTitol);
    trhead.appendChild(thDurada);
    thead.appendChild(trhead);
    return thead;
}