import { cancons } from "../../data/canco";
import { createTableHead } from "./createTableHead";
import { llistaCancons } from "./llistaCancons";

export function viewListTracks() : HTMLTableElement{

    const table: HTMLTableElement = document.createElement("table");

    table.appendChild(createTableHead());

    const tbody: HTMLTableSectionElement = document.createElement("tbody");

    llistaCancons(cancons, tbody);
    table.appendChild(tbody)
    return table
}
