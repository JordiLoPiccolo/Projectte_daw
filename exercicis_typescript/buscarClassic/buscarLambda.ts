interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}

function imprimir(trobat: boolean): void {
    if (trobat) {
        console.log("Canço existeix");
    } else {
        console.log("Canço no existeix");
    }
}

const cancoABuscar: Canco = {
    id: "2B-CA",
    titol: "Rattle and Ham",
    artista: "U2",
    durada: 90
}

const cancons: Canco[] = [

    {
        id: "2B-CA",
        titol: "Rattle and Ham",
        artista: "U2",
        durada: 90
    },
    {
        id: "5f-JK",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 190
    },
]



console.log(cancoABuscar);


let titol: string = "Chicago";
const CancorBuscador: Canco[] = cancons.filter(
    (c: Canco) => {
        return c.titol === titol;
    }
);


console.log(CancorBuscador);

export { }