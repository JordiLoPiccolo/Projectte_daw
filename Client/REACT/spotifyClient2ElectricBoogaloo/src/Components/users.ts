const usuaris: string[] = ["Pol", "Joan", "Eric", "Mar", "Vilila"];

export function randomUser() {
    
    let random: number = Math.floor(Math.random() * usuaris.length);
    return usuaris[random];
}