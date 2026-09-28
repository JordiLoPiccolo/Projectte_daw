import type { Canco } from "../interface/canco";

export function createRowSong(canco: Canco/*afegeix una funció aqui que agafi la id*/ ): HTMLTableRowElement {
    const songTr: HTMLTableRowElement = document.createElement("tr");

    const titleTd: HTMLTableCellElement = document.createElement("td");
    titleTd.textContent = canco.titol;

    const duradaTd: HTMLTableCellElement = document.createElement("td");
    duradaTd.textContent = canco.durada.toString();

    songTr.appendChild(titleTd);
    songTr.appendChild(duradaTd);

    songTr.addEventListener("click", () => {

        getIdCanco();
    });

    function getIdCanco(){
        return canco.id;
    }

    return songTr;

}


