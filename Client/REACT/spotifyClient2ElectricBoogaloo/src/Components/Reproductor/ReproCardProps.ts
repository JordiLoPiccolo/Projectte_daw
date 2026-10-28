import type { reproductor } from "../../Model/Reproductor";

export interface ReproCardProps {
    reproductor: reproductor
    controlVolum: (pujabaixa:boolean) => number;
  
}