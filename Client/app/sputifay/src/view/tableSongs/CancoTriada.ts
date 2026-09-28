import type { Canco } from "../../interface/canco";
import { createCancoTriada } from "../createCancoTriada";

export function cancoTriada(cancons: Canco[], cancoId: string, tbody: HTMLDivElement): void {
    cancons.forEach(
        (c: Canco) => { if (c.id === cancoId) { tbody.appendChild(createCancoTriada(c)); } }
    )

}