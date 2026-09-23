interface Jugador {
    nom: string;
    titular: boolean;
}

interface Equip {
    name: string;
    players: Jugador[];
}

const Partit: Equip[] = [{

    name: "Raimon",
    players: [
        {
            nom: "Marc Evans",
            titular: true,
        },
        {
            nom: "Axel Blaze",
            titular: false,
        },
        {
            nom: "Nate",
            titular: false,
        }
    ]

},
{
    name: "Champions FC",
    players: [{
        nom: "Oliver Benji",
        titular: true
    }, {
        nom: "Lionel Messi",
        titular: true
    },
    {
        nom: "Yashandeep",
        titular: false
    }
    ]
}
]

function crearTitular(equip: Equip, jugador: Jugador[]): Equip[] {
    let EquipTitular: Equip;

    const player: Jugador[] = jugador.filter(
        (j: jugador) => (j.titular === true)
    )
        (e: Equip) => {

    }

    return equip
}





