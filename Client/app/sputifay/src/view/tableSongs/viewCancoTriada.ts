import { cancons } from "../../data/canco";


import { cancoTriada } from "./CancoTriada";

export function viewCancoTriada(cancoId: string): HTMLDivElement {

    const carta: HTMLDivElement = document.createElement("div");

    cancoTriada(cancons, cancoId, carta);
    return carta;
}
