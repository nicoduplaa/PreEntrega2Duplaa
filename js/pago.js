

const contenedorPago = document.getElementById("contenedorPago");
const confirmBtn = document.getElementById("payNow")
const modalPago = document.getElementById("modalPago")

let buyerData = [];

const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

const totalBuy = document.createElement("div")
totalBuy.className = "form-end"
totalBuy.innerHTML = `
            <h1>TOTAL $${total}</h1>
        `

contenedorPago.insertBefore(totalBuy, contenedorPago.children[2]);


confirmBtn.addEventListener("click", () => {

    let owner = document.getElementById("owner");
    let cvv = document.getElementById("cvv");
    let cardNumber = document.getElementById("cardNumber");
    let mesVencimiento = document.getElementById("mesVencimiento");
    let añoVencimiento = document.getElementById("añoVencimiento");

    if (cvv.value.length > 3 || cardNumber.value.length > 16) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos Incorrectos!',
          })
        return;
    } else if (owner.value == false || cvv.value == false || cardNumber.value == false ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos Faltantes!',
          })
          return;
    } else {
        buyerData.push({
            nombre: owner.value,
            cvv: cvv.value,
            card: cardNumber.value,
            mesVencimiento: mesVencimiento.value,
            añoVencimiento: añoVencimiento.value
        })
    
    }

    modalPago.style.top = "20vh";
    const modalHeader = document.createElement("h2")
    modalHeader.className = "modal-header section-header";
    modalHeader.innerText = "DATOS DE COMPRA";

    modalPago.append(modalHeader);

    buyerData.forEach((dato)=> {
        const modalDatos = document.createElement("div")
        modalDatos.className = "modal-header section-header";
        modalDatos.innerHTML = ` 
            <h4>Gracias por su compra ${dato.nombre}</h4>
            <h4>Tarjeta: **** **** **** ${dato.card[12]}${dato.card[13]}${dato.card[14]}${dato.card[15]}</h4>
            `;

        modalPago.append(modalDatos)
    })


    const modalRows = document.createElement("div")
    modalRows.className = "cart-row";
    modalRows.innerHTML = `
    <span class="cart-item cart-header cart-column">ITEM</span>
    <span class="cart-price cart-header cart-column">PRECIO</span>
    <span class="cart-quantity cart-header cart-column">CANTIDAD</span>
    `;

    modalPago.append(modalRows);

    carrito.forEach((product) => {

        let cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
 
        let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${product.img}" width="100" height="100">
            <span class="cart-item-title">${product.nombre}</span>
        </div>
        <span class="cart-price cart-column">$${product.precio}</span>
        `;

        cartRow.innerHTML = cartRowContents
        modalPago.append(cartRow)

        let cantidadYBorrar = document.createElement("div");
        cantidadYBorrar.className = "cart-quantity cart-column";
        cantidadYBorrar.innerHTML = `
            <span class="cart-quantity-input">${product.cantidad}</span>
            
        `;

        cartRow.append(cantidadYBorrar);

    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuy = document.createElement("div")
    totalBuy.className = "cart-total"
    totalBuy.innerHTML = `
        <strong class="cart-total-title">TOTAL</strong>
        <span class="cart-total-price">$${total}</span>
    `
    modalPago.append(totalBuy);

    const comprarButton = document.createElement("div")

    comprarButton.innerHTML = `    
        <a class="finalbtn" href="./productos.html" >
            <button class="btn-purchase" id="btnPurchaseFinal">
                COMPRAR
            </button>
        </a>` ;
    
    modalPago.append(comprarButton);

    let finalButton = comprarButton.querySelector("#btnPurchaseFinal");

    finalButton.addEventListener("click", borrarCarro)
    
    
    console.log(buyerData);
    console.log(carrito);
})

const borrarCarro = () => {
    localStorage.clear();
}



