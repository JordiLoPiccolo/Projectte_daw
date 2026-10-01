import { cancons } from './data/canco';
import type { Canco } from './interface/canco';
import './style.css';
import { crearCerca } from './view/cerca/crearCerca';
import { crearTitol } from './view/crearTitol';
import { llistaCancons } from './view/tableSongs/llistaCancons';
import { viewCancoTriada } from './view/tableSongs/viewCancoTriada';
import { viewListTracks } from './view/tableSongs/viewListTracks';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;
const tbody: HTMLTableSectionElement = document.createElement("tbody");
const cardCanco: HTMLDivElement = document.createElement("div");

const getIdCanco: (id: string) => void = (id:string) =>{
    cardCanco.replaceChildren(viewCancoTriada(id));
}

const cercar: (textABuscar: string) => void = (textABuscar: string) => {
    const llistaTracks: Canco[] = cancons.filter(
        (c: Canco) => { return c.titol.trim().toLowerCase().includes(textABuscar.trim().toLowerCase()) }
    );
    tbody.innerHTML = "";
    llistaCancons(llistaTracks, tbody, getIdCanco);
}



appObj.appendChild(crearTitol());
appObj.appendChild(crearCerca(cercar));
appObj.appendChild(viewListTracks(tbody, getIdCanco));
appObj.appendChild(cardCanco);

