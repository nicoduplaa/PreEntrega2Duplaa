// Storage

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);


//Chequeo de que la pagina cargo:
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}



let inventary = [
    {
        id: 1, 
        img:"../assets/img_cemento/cat.jpg", 
        nombre:'GATO', 
        precio:'$900', 
        tipo:'Maceta de Cemento'
    },

    {
        id: 2, 
        img:"../assets/img-color/buho.jpg", 
        nombre:'BUHO', 
        precio:'$1050', 
        tipo:'Maceta Coloreada'
    },

    {
        id: 3, 
        img:"../assets/img_cemento/dode.jpg", 
        nombre:'DODECAEDRO', 
        precio:'$900',
        tipo:'Maceta de Cemento'
    },

    {
        id: 4, 
        img:"../assets/img-color/llama.jpg", 
        nombre: 'LLAMA', 
        precio: '$1100',
        tipo:'Maceta Coloreada'
    },

    {
        id: 5, 
        img:"../assets/img_cemento/ele.jpg", 
        nombre: 'ELEFANTE', 
        precio: '$900',
        tipo:'Maceta de Cemento' 
    },

    {
        id: 6, 
        img:"../assets/img-color/sonic.jpg", 
        nombre: 'ERIZO', 
        precio: '$1100',
        tipo:'Maceta Coloreada'
    }
]

const productos = document.querySelector('.productos');

inventary.forEach((el)=> {
    let code = `
    <div class="card">
            
        <div class="card-cont">
            <img class="itemImg" src=${el.img} alt="">
            <h4 class="itemName">${el.nombre}</h4>

            <p>${el.tipo}</p>
            <p class="itemPrice">${el.precio}</p>
            <button class="btn btn-primary item-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="19" r="2" />
                <circle cx="17" cy="19" r="2" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                <path d="M15 6h6m-3 -3v6" />
                </svg>
            </button>
        </div>
    </div> `
    productos.innerHTML += code;
    }
)

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }  

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input,addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchasheClicked)
}

//Comprar
function purchasheClicked() {
    alert('Gracias por tu compra!')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

//REMOVER
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove()

    updateCartTotal();
}

//CANTIDAD
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }

    updateCartTotal()
}

//Agregar a Carrito Condicional con LS
if (carrito.length >= 1) {
    carrito.forEach((el) => {
        console.log('Elementos previos del carrito: ' + el.nombre);
        addItemToCart(el.nombre, el.precio, el.imagen);
        updateCartTotal();
        
    })
}


//Agregar a Carrito
function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('itemName')[0].innerText
    let price = shopItem.getElementsByClassName('itemPrice')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('itemImg')[0].src
    
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {

    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]

    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Este producto ya fue agregado al carrito')
            return;
        }  
    }

    let cartRowContents = `                
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)

    carrito.push({
        nombre: title,
        precio: price,
        imagen: imageSrc
    })
    
    updateCartTotal();
    carritoInfo();
}


//Actualizar Total

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$',''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

//Storage

//Set Item
const carritoInfo = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

updateCartTotal();
carritoInfo();
//Get Item

// JSON.parse(localStorage.getItem("carrito"));