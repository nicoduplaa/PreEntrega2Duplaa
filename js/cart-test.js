//let maceta = prompt('Ingrese el nombre de la maceta que desea comprar') ;

let stock = ['gato','buho','dodecaedro','llama','elefante','erizo'];
let macArr = [];
let cantArr = [];
let maceta = 'gato';
let cantidad = 0;




while (maceta.toLowerCase() !== 'esc') {
    
    maceta = prompt('Ingrese el nombre de la maceta que desea comprar, para salir ingresar ESC');
    if (maceta.toLowerCase() == 'esc') {
        break
    } else if (!stock.includes(maceta.toLowerCase())) {
        alert('No existe esa maceta en nuestro stock, recarga la página para volver a empezar')
        break
    } 
    cantidad = prompt('Ingrese la cantidad que desea comprar de esa maceta');
    macArr.push(maceta.toLowerCase());
    cantArr.push(Number(cantidad));
}


console.log(macArr);
console.log(cantArr);


