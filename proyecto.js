/* Pasos 
1.Dar bienvenida
2.Pedir que ingrese su nombre+Apellido
3.Ofrecer tipo de cafe
4.Cantidad de producto
5. */

// Ejecución del código


  

function init() {

  datos ();
  
    
}


// Clase constructora de objetos
class Cafe {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}


//Variable
let cafeTipo = [
    {
        nombre: "Colombiano", id: 01, precio: 370, stock: 100, activo: true },
    {
        nombre: "Cortado", id: 02, precio: 300, stock: 100, activo: true },
    {
        nombre: "Americano", id: 03, precio: 350, stock: 100, activo: true },
    {
        nombre: "Latte", id: 04, precio: 250, stock: 100, activo: true },
    {
        nombre: "Espresso", id: 05, precio: 280, stock: 80, activo: true },
    {
        nombre: "Cappucino", id: 06, precio: 290, stock: 100, activo: true },
]



//Modificaciones DOM - Funciones


function searchProduct() {
   const input = document.getElementById('filter').value.toUpperCase();
   
   const cardContainer = document.getElementById('cart-lists');
   console.log(cardContainer);

   const cards = cardContainer.getElementsByClassName('card');
   console.log(cards);

   for(let i = 0; i < cards.length; i++) {
       let title = cards [i].querySelector(".card-body h5.item-title");
       console.log(title);

       if(title.innerText.toUpperCase().indexOf(input) > -1) {
           cards[i].style.display = "";
       } 
       else {
            cards[i].style.display = "none";
       }
   }

    
}

   // H2 "bienvenido"
   const newSub = document.getElementById('newSub');


// Añadir al carrito

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.card');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  //Creacion de carrito

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.appendChild(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

// Total 
function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}


//Eliminar producto
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

// Cantidad  "Operador TERNARIO"
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

//Comprar 
function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}











//carga de datos 


function datos () {
    localStorage.setItem ("nodoTareas", JSON.stringify(cafeTipo));
}

function precargarDatos () {
    if(localStorage.getItem("nodoTareas")==!null)
    {
        cafeTipo = JSON.parse(localStorage.getItem("nodoTareas"));
    }
    
    console.log(cafeTipo);
}


//Operadores avanzados

const ShoppingCartTotal = cafeTipo.reduce((total, cafeTipo)=>total+=(cafeTipo.precio),0);
console.log(ShoppingCartTotal)

// Operador Y
/* numero%2==0 && alert("numero par"); */


