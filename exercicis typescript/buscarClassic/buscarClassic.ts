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
