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

const nomEquip: string = "Equip Real";

const jugadorsTitulars: Jugador[] = equipTitular(Partit, nomEquip)

function equipTitular(equip: Equip[], nomEquip: string): Jugador[] {

    let titulars: Jugador[] = [];
    for (let i: number = 0; i <= equip.length; i++) {
        for (let j: number = 0; equip[i].players.length; j++) {
            if (equip[i].players[j].titular === true) {
                titulars.push(equip[i].players[j]);
            }
        }
    }
    console.log(titulars);
    return titulars;
}





