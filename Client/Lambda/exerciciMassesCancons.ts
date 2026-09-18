interface user {
    nom: string;
    LlistaCancons: Canco[];
}


interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}



const cancons2: Canco[] = [

    {
        id: "2B-CA",
        titol: "Rattle and Ham",
        artista: "U2",
        durada: 90
    },
    {
        id: "oj-ek",
        titol: "Fist of fury",
        artista: "U2",
        durada: 190
    },
    {
        id: "5f-JK",
        titol: "Chicago",
        artista: "Michael Jackson",
        durada: 190
    },
    {
        id: "Df-ei",
        titol: "Thriller",
        artista: "Michael Jackson",
        durada: 180

    }
]





function imprimirArray(cancons: Canco[]): void {
    for (let i: number = 0; i < cancons.length; i++) {

        console.log(cancons[i]);
    }
}