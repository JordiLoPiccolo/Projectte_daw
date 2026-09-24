import './style.css';
import { crearCerca } from './view/cerca/crearCerca';
import { crearTitol } from './view/crearTitol';
import { viewListTracks } from './view/tableSongs/viewListTracks';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

appObj.appendChild(crearTitol());
appObj.appendChild(viewListTracks());
appObj.appendChild(crearCerca());

