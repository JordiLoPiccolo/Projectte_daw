### hola miquel aqui tens 



```typescript
type TipusEntrega = "express" | "estandar";

interface Producte {
    nom: string;
    tempsEntrega: number;
}

function calcularTempsEntrega(
    productes: Producte[],
    tipusEntrega: TipusEntrega
): number {
    // Si no hi ha productes, no hi ha temps d'entrega.
    if (productes.length === 0) {
        return 0;
    }

    let tempsMaxim = 0;

    for (const producte of productes) {

        // Les dades de la BD poden ser incorrectes.
        // Si el temps no és un número o és negatiu, l'ignorem.
        if (
            typeof producte.tempsEntrega !== "number" ||
            !Number.isFinite(producte.tempsEntrega) ||
            producte.tempsEntrega < 0
        ) {
            continue;
        }

        // La comanda es considera rebuda quan arriba
        // l'últim producte, per això agafem el temps màxim.
        if (producte.tempsEntrega > tempsMaxim) {
            tempsMaxim = producte.tempsEntrega;
        }
    }

    /*
     * Decisió davant l'ambigüitat:
     * - "Estandard": mantenim el temps calculat a partir dels productes.
     * - "Express": també necessitem esperar l'últim producte,
     *   però assumim que l'entrega express redueix el temps a la meitat.
     *
     * Si la base de dades conté dades incoherents, els productes
     * amb temps invàlid s'ignoren en lloc de provocar un error.
     */
    if (tipusEntrega === "express") {
        return tempsMaxim / 2;
    }

    return tempsMaxim;
}


// Exemple d'ús
const carro: Producte[] = [
    {
        nom: "Ordinador",
        tempsEntrega: 5
    },
    {
        nom: "Ratolí",
        tempsEntrega: 2
    },
    {
        nom: "Teclat",
        tempsEntrega: 3
    }
];

const tempsEstandard = calcularTempsEntrega(carro, "estandar");
const tempsExpress = calcularTempsEntrega(carro, "express");

console.log("Entrega estàndard:", tempsEstandard, "dies");
console.log("Entrega express:", tempsExpress, "dies");
```
