



const carritoShow = () => {


    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    modalContainer.style.top = "20vh";

    //Titulo del Carrito

    const modalHeader = document.createElement("h2")
    modalHeader.className = "modal-header section-header";
    modalHeader.innerText = "CART";

    modalContainer.append(modalHeader);

    //Boton de Cerrar

    const modalButton = document.createElement("h2");
    modalButton.className = "section-header modal-header-button";
    modalButton.innerText = "X";

    modalButton.addEventListener("click", ()=> {
        modalContainer.style.display = "none";
    })
    
    modalHeader.append(modalButton);

    //Columnas

    const modalRows = document.createElement("div")
    modalRows.className = "cart-row";
    modalRows.innerHTML = `
    <span class="cart-item cart-header cart-column">ITEM</span>
    <span class="cart-price cart-header cart-column">PRECIO</span>
    <span class="cart-quantity cart-header cart-column">CANTIDAD</span>
    `;

    modalContainer.append(modalRows);

    //Items Comprados

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
        modalContainer.append(cartRow)

        let cantidadYBorrar = document.createElement("div");
        cantidadYBorrar.className = "cart-quantity cart-column";
        cantidadYBorrar.innerHTML = `
            <input class="cart-quantity-input" type="number" value="${product.cantidad}">
            <button class="btn btn-danger" type="button">REMOVER</button>
        `

        cartRow.append(cantidadYBorrar);

        let cantidadInput = cantidadYBorrar.querySelector(".cart-quantity-input");

        cantidadInput.addEventListener("change", (event) => {
            let input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }

            product.cantidad = parseFloat(input.value);

            carritoShow();
            saveLocal();
        })

        let eliminar = cantidadYBorrar.querySelector(".btn-danger");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        })
    })

    //Total

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuy = document.createElement("div")
    totalBuy.className = "cart-total"
    totalBuy.innerHTML = `
        <strong class="cart-total-title">TOTAL</strong>
        <span class="cart-total-price">$${total}</span>
    `
    modalContainer.append(totalBuy);

    //Comprar 

    const comprarButton = document.createElement("button")
    comprarButton.className = "btn-purchase";
    comprarButton.innerText = "COMPRAR";

    modalContainer.append(comprarButton);

};

verCarrito.addEventListener("click", carritoShow);


const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    carritoShow();
}

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();