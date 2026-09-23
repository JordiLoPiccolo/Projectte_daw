import './style.css';
import { cancons } from './data/canco';
import { createRowSong } from './view/rowView';

const appObj: HTMLElement = document.querySelector<HTMLDivElement>('#app')!;

const titol: HTMLHeadingElement = document.createElement("h1");

const table: HTMLTableElement = document.createElement("table");

const rowSong: HTMLTableRowElement = createRowSong(cancons[0]);

titol.textContent = "Sputifay";

appObj.appendChild(titol);

table.appendChild(rowSong);

appObj.appendChild(table);