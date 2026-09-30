import { cancons } from "../../data/canco";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function viewListTracks(tbody: HTMLTableSectionElement, getIdCanco: (id: string) => void): HTMLTableElement {

    const table: HTMLTableElement = document.createElement("table");

    table.appendChild(createTableHead());

    llistaCancons(cancons, tbody, getIdCanco);
    table.appendChild(tbody)
    return table
}
