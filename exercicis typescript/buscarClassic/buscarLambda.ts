function imprimir(canco: Canco): void {

}

const cancons: Canco[] = [

]

let titol: string = "Chicago";
const CancorBuscador: Canco[] = cancons.filter(
    (c: Canco) => {
        return c.titol === titol;
    }
);

console.log(CancorBuscador);

export { }