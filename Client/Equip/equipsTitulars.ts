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


function equipTitular(equip: Equip[], nomEquip: string): Jugador[] {

    const equipSel: Equip | undefined = equip.find(
        (e: Equip) => {
            return e.name === nomEquip
        }
    );

    if (equipSel === undefined) {
        return [];
    }

    return equipSel.players.filter(
        (j: Jugador) => { return j.titular; }
    )


}
const nomEquip: string = "Champions FC";

const jugadorsTitulars: Jugador[] = equipTitular(Partit, nomEquip)

console.log(jugadorsTitulars);



