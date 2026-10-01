import type { Canco } from "../../interface/canco";

export function mesReproduccions(canco: Canco): Canco{
    
    canco.reproduccions++;
    return canco;
}