import type { Canco } from "../../interface/canco";
import { createRowSong } from "../rowView";

export function llistaCancons(cancons: Canco[], tbody: HTMLTableSectionElement, getIdCanco: (id: string) => void): void {
  
  
    let botoEnReproduccio: HTMLButtonElement | null = null;
    cancons.forEach(
        (c: Canco) => {
            tbody.appendChild(createRowSong(c, getIdCanco,botoEnReproduccio));
        }
    )

}