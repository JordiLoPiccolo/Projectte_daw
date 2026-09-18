interface user {
    nom: string;
    playList: PlayList[];
}
interface PlayList {
    NomLlista: string;
    LlistaCancons: Canco[];
}
interface Canco {
    titol: string;
    artista: string;
    durada: number;
    id: string;
}



const LlistaCancons: PlayList[] = [

    {
        NomLlista: "LMarc",
        LlistaCancons: [
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
        ]
    },
    {
        NomLlista: "LIsac",
        LlistaCancons: [
            {
                id: "Df-ei",
                titol: "Thriller",
                artista: "Michael Jackson",
                durada: 180

            }
        ]
    },
    {
        NomLlista: "LBerni",
        LlistaCancons: [
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
    }
]

const users: user[] = [
    {
        nom: "Marc",
        playList: [LlistaCancons[0]]
    },
    {
        nom: "Isaac",
        playList: [LlistaCancons[1], LlistaCancons[0]]
    },
    {
        nom: "Berni",
        playList: [LlistaCancons[2]]
    }
]

let nomArtista: string = "Michael Jackson";
let nomUsuari: string = "Marc;"

const songs: Canco[] = songsArtist(nomArtista, nomUsuari, users);

function CancorBuscador(artista: string, cancons: Canco[]): Canco[] {
    return cancons.filter(
        (c: Canco) => {
            return artista === c.artista;
        }
    );
}


function songsPlayList(artista: string, playList: PlayList[]): Canco[] {

    let cancons: Canco[] = [];
    for (let i: number = 0; i < playList.length; i++) {
        const CancoArtista: Canco[] = (CancorBuscador(artista, playList[i].LlistaCancons));
        for (let x: number = 0; x < CancoArtista.length; x++) {
            cancons.push(CancoArtista[x]);
        }
    }
    return cancons;
}
function songsArtist(artista: string, usuari: string, users: user[]): Canco[] {
    const user: user[] = users.filter(
        (u: user) => { return u.nom === usuari }
    );

    const playListUser: PlayList[] = user[0].playList;
    return songsPlayList(artista, playListUser);

}
console.log(songs);
export { }