import './style.css';
import { crearCerca } from './view/cerca/crearCerca';
import { crearTitol } from './view/crearTitol';
import { viewListTracks } from './view/tableSongs/viewListTracks';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

const titol: HTMLHeadElement = crearTitol();

const table: HTMLTableElement = viewListTracks();

const form: HTMLFormElement = crearCerca(); 

appObj.appendChild(titol);

appObj.appendChild(table);

appObj.appendChild(form);