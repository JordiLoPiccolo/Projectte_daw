import type { Canco } from "../../interface/canco";
import { createRowSong } from "../rowView";

export function llistaCancons(cancons: Canco[], tbody:HTMLTableSectionElement):void {
    cancons.forEach(
        (c: Canco) => { tbody.appendChild(createRowSong(c)); }
    )

}