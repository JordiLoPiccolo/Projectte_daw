function autenticar(): void {
    let correu: string = prompt("Introdueix el teu correu:") || "";
    let contrasenya: string = prompt("Introdueix la teva contrasenya:") || "";
    let edat: number = Number(prompt("Introdueix la teva edat:"));

    const correuCorrecte: string = "usuari@gmail.com";
    const contrasenyaCorrecta: string = "1234";
    const edatMinima: number = 18;

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