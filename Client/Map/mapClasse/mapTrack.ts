interface Canco {
    id: string;
    titol: string;
    artista: string;
    durada: number;

}

interface Track {
    title: string;
    duration: number;
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

const tracks: Track[] = cancons.map(

    (c: Canco) => {
        return { title: c.titol, duration: c.durada }
    }
)

const songString: string[] = cancons.map(
    (c: Canco) => {
        let text: string = `${c.titol} (${c.artista} - durada: ${c.durada})`
        return text.trim();
    }
)

const fullCanco: string[] = cancons.map(

    (c: Canco) => {
        let temps: number = c.durada;
        let minuts: number = Math.floor(temps / 60);
        let segons: number = temps - minuts;
        let text: string = `titol: ${c.titol}, durada: ${minuts} minuts, ${segons} segons)`

        console.log(text)
        return text;
    }
)

