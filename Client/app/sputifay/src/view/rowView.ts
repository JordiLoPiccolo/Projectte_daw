import type { Canco } from "../interface/canco";

export function createRowSong(canco: Canco): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = canco.titol;

    const duradaTd: HTMLTableCellElement = document.createElement("td");
    duradaTd.textContent = canco.durada.toString();

    songTr.appendChild(titleTd);
    songTr.appendChild(duradaTd);

    return songTr;

}