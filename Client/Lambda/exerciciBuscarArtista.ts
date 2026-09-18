interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}

const cancons: Canco[] = [

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



let artista: string = "Michael Jackson";
const CancorBuscador: Canco[] = cancons.filter(
    (c: Canco) => {
        return c.artista === artista;
    }
);

console.log(CancorBuscador);
