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
function imprimirLl(trobat: Canco): void {
    if (trobat) {
        console.log("Canço existeix");
    } else {
        console.log("Canço no existeix");
    }
}

function imprimirArray(cancons: Canco[]): void {
    for (let i: number = 0; i < cancons.length; i++) {

        imprimirLl(cancons[i]);
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

function buscarCanco(canco: Canco, cancoList: Canco[]): boolean {

    const totalCancons: number = cancoList.length;
    let i: number = 0;
    let noTrobat: boolean = true;
    while (noTrobat && i < totalCancons) {
        if (canco.titol === cancoList[i].titol) noTrobat = false;
        i++;
    }

    return !noTrobat;
}

let existeixCanco: boolean = buscarCanco(cancoABuscar, cancons);
imprimir(existeixCanco);

function buscarCancoLlarga(durada: number, cancoList: Canco[]): Canco[] {
    const totalCancons: number = cancoList.length;
    const canconsLlargues: Canco[] = [];

    for (let i: number = 0; i < totalCancons; i++) {
        if (cancoList[i].durada >= durada) {
            canconsLlargues.push(cancoList[i]);
        }
    }

    return canconsLlargues;
}

const canconsLl: Canco[] = buscarCancoLlarga(30, cancons);
imprimirArray(canconsLl);
export { }

//1. fer servir filter i retornar totes les cancons d'un artista,2. hi ha varis usuaris que cada un te varies llistes cada llista amb varies cancons,