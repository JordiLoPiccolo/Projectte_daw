// la versio simple

interface usuari {
    correu: string,
    contrasenya: string,
    edat: number;
}

function autentificacio(usuari: usuari): boolean {

    let correcte: boolean = false;
    if (usuari.correu === "correuCorrecte" && usuari.contrasenya === "contrasenya" && usuari.edat > 14) {
        correcte = true;
    }

    return correcte;
}

function imprimir1(auth: boolean): void {
    if (auth) {
        console.log("Usuari autentificat");
    } else {
        console.log("Usuari, contrasenya o edat no valids");
    }
}

const usuariCorrecte: usuari = {
    correu: "correuCorrecte",
    contrasenya: "contrasenya",
    edat: 15
}

let autOk: boolean = autentificacio(usuariCorrecte)

imprimir1(autOk);
console.log(autentificacio(usuariCorrecte));

//la versio complicada
function autenticar(): void {
    let correu: string = prompt("Introdueix el teu correu:") || "";
    let contrasenya: string = prompt("Introdueix la teva contrasenya:") || "";
    let edat: number = Number(prompt("Introdueix la teva edat:"));

    const correuCorrecte: string = "ola@gmail.com";
    const contrasenyaCorrecta: string = "6769";
    const edatMinima: number = 14;

    if (
        correu === correuCorrecte &&
        contrasenya === contrasenyaCorrecta &&
        edat >= edatMinima
    ) {
        console.log("Autenticació correcta. Benvingut!");
    } else {
        console.log("Autenticació incorrecta.");
    }
}

autenticar();