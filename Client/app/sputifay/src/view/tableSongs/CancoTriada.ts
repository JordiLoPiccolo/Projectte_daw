import type { Canco } from "../../interface/canco";
import { createCancoTriada } from "../createCancoTriada";
import { createRowSong } from "../rowView";

export function cancoTriada(cancons: Canco[], canco: Canco, tbody: HTMLDivElement): void {
    cancons.forEach(
        (c: Canco) => { if (c.id === canco.id) { tbody.appendChild(createCancoTriada(c)); } }
    )

}