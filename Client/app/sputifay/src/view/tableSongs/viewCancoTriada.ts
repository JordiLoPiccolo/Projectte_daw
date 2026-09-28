import { cancons } from "../../data/canco";
import type { Canco } from "../../interface/canco";

import { cancoTriada } from "./CancoTriada";

export function viewCancoTriada(tbody: HTMLDivElement, canco: Canco): void {

    cancoTriada(cancons, canco, tbody);
}
