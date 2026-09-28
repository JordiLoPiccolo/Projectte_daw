import { cancons } from "../../data/canco";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function viewListTracks(tbody: HTMLTableSectionElement): HTMLTableElement {

    const table: HTMLTableElement = document.createElement("table");

    table.appendChild(createTableHead());
    
    llistaCancons(cancons, tbody);
    table.appendChild(tbody)
    return table
}
