const usuaris: string[] = ["Pol", "Joan", "Eric", "Mar", "Vilila"];

export function randomUser() {
    
    const random: number = Math.floor(Math.random() * usuaris.length);
    return usuaris[random];
}