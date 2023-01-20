
const productos = document.getElementById("shop");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// Carrito

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

inventary.forEach((el)=> {

    let content = document.createElement("div")
    content.className = "card card-cont"

    content.innerHTML = `    

            <img class="itemImg" src=${el.img} alt="">
            <h4 class="itemName">${el.nombre}</h4>

            <p>${el.tipo}</p>
            <p class="itemPrice">${el.precio}</p>
            `
    
    productos.append(content);


    let comprar = document.createElement("button");

    comprar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="6" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
    <path d="M17 17h-11v-14h-2" />
    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
    <path d="M15 6h6m-3 -3v6" />
    </svg>`

    comprar.className = "comprar"

    content.append(comprar)

    comprar.addEventListener("click", () => {

        const repeat = carrito.some((repeatProduct) => repeatProduct.id === el.id);

        if (repeat) {
            carrito.map((prod) => {
                if (prod.id === el.id) {
                    alert('Este producto ya fue agregado al carrito');
                }
            })
        } else {
            carrito.push({
                id: el.id,
                img: el.img,
                nombre: el.nombre,
                precio: parseFloat(el.precio.replace('$','')),
                cantidad: el.cantidad
            })
        }

  
        console.log(carrito);

        carritoCounter();

        saveLocal();


    })

})


//SET ITEM 
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};









