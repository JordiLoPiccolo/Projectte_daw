import { cancons } from "../../data/canco";


import { cancoTriada } from "./CancoTriada";

export function viewCancoTriada(cancoId:string,tbody: HTMLDivElement):HTMLDivElement {
    
    const carta: HTMLDivElement = document.createElement("div");


    cancoTriada(cancons,cancoId,tbody)
    return carta;
}
