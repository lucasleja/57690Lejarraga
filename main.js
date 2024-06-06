class Producto{
    constructor(id, nombre, marca, linea, modelo, stock, precio, img ){
        this.id = id
        this.nombre = nombre
        this.marca = marca
        this.linea = linea
        this.modelo = modelo
        this.stock = stock
        this.precio = precio
        this.img = img
    }
}

const productos = []

let producto1 = new Producto(1, "bicicleta mtb", "specialized", "rockhopper", "sport", 25, 800000, "./img/specialized/1.webp")
let producto2 = new Producto(2, "bicicleta mtb", "specialized", "epic", "comp carbon", 15, 3000000, "./img/specialized/2.webp")
let producto3 = new Producto(3, "bicicleta electrica", "specialized", "turvo Levo", "comp carbon", 10, 5000000, "./img/specialized/3.webp")
let producto4 = new Producto(4, "bicicleta mtb", "specialized", "rockhopper",  "expert", 15, 4000000, "./img/specialized/4.webp")
let producto5 = new Producto(5, "bicicleta ruta", "specialized", "tarmac", "sl6", 20, 5000000, "./img/specialized/5.webp")
let producto6 = new Producto(6, "bicicleta ruta", "specialized", "tarmac", "sl7", 5, 5000000, "./img/specialized/6.webp")

let producto7 = new Producto(7, "bicicleta mtb", "cannondale", "trial", "7", 25, 800000, "./img/cannondale/7.jpg")
let producto8 = new Producto(8, "bicicleta mtb", "cannondale", "trial", "5", 15, 3000000, "./img/cannondale/8.jpg")
let producto9 = new Producto(9, "bicicleta mtb", "cannondale", "trial", "se4", 10, 5000000, "./img/cannondale/9.jpg")
let producto10 = new Producto(10, "bicicleta ruta", "cannondale", "caad", "12", 15, 4000000, "./img/cannondale/10.jpg")
let producto11 = new Producto(11, "bicicleta ruta", "cannondale", "caad", "optimo", 20, 5000000, "./img/cannondale/11.jpg")
let producto12 = new Producto(12, "bicicleta ruta", "cannondale", "caad", "13", 20, 5000000, "./img/cannondale/12.jpg")

let producto13 = new Producto(13, "bicicleta mtb", "trek", "marlin", "8", 8, 2000000, "./img/trek/13.jpg")
let producto14 = new Producto(14, "bicicleta mtb", "trek", "xcaliber", "8", 21, 2500000, "./img/trek/14.jpg")
let producto15 = new Producto(15, "bicicleta ruta", "trek", "emondal", "pro", 10, 8000000, "./img/trek/15.jpg")
let producto16 = new Producto(16, "bicicleta ruta", "trek", "domane", "al3", 15, 4000000, "./img/trek/16.jpg")
let producto17 = new Producto(17, "bicicleta ruta", "trek", "domane", "al2", 20, 3500000, "./img/trek/17.jpg")
let producto18 = new Producto(18, "bicicleta mtb", "trek", "supercaliber", "9.7", 20, 5000000, "./img/trek/18.jpg")

productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18);

console.log(productos)

console.table(productos)

document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;
    const nav = document.querySelector('nav');
    const footer = document.querySelector('footer');
    const botonToggle = document.getElementById('toggleButton');

    function aplicarModoOscuro(estaOscuro) {
        if (estaOscuro) {
            body.classList.add('dark-mode');
            nav.classList.add('dark-mode');
            footer.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            nav.classList.remove('dark-mode');
            footer.classList.remove('dark-mode');
        }
    }

    function alternarModoOscuro() {
        const estaEnModoOscuro = body.classList.toggle('dark-mode');
        nav.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
        localStorage.setItem('modoOscuro', estaEnModoOscuro? 'habilitado' : 'deshabilitado');
    }

    function inicializarModoOscuro() {
        const modoOscuroGuardado = localStorage.getItem('modoOscuro');
        aplicarModoOscuro(modoOscuroGuardado === 'habilitado');
    }

    inicializarModoOscuro();

    botonToggle.addEventListener('click', alternarModoOscuro);
});


/* *************************************************************************************************************************************
*****************************************************CARRITO DE COMPRAS*****************************************************************
************************************************************************************************************************************* */


/* function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        let productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">Marca: ${product.marca}<br>Linea: ${product.linea}<br>Modelo: ${product.modelo}</p>
                        <p>Precio: $${product.precio.toLocaleString()}</p>
                        <p>Stock: ${product.stock}</p>
                        <input type="number" min="0" max="${product.stock}" value="0" class="form-control">
                        <button onclick="addToCart(${product.id})" class="btn btn-primary mt-2">Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
        container.innerHTML += productCard;
    });
}


renderProducts(productos.filter(p => p.marca === 'specialized'), 'productContainer');



let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        alert("No hay stock de este producto");
        return;
    }

    if (!cart[productId]) {
        cart[productId] = {...product, quantity: 1 };
    } else {
        cart[productId].quantity++;
    }

    alert(`Usted agregó ${product.nombre} al carrito`);
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 
    let total = 0;
    Object.values(cart).forEach(item => {
        total += item.precio * item.quantity;
        let cartItem = `<p>${item.nombre}: ${item.quantity} x $${item.precio.toLocaleString()} = $${(item.precio * item.quantity).toLocaleString()}</p>`;
        cartContainer.innerHTML += cartItem;
    });

    if (Object.keys(cart).length > 0) {
        cartContainer.innerHTML += `<hr><p>Total: $${total.toLocaleString()}</p><button onclick="purchase()" class="btn btn-success">Comprar</button>`;
    } else {
        cartContainer.innerHTML = '<p>El carrito aún está vacío.</p>';
    }
}

function purchase() {
    if (Object.keys(cart).length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Su compra se realizó con éxito");
    localStorage.removeItem('cart');
}


window.onload = function() {
    loadCartFromLocalStorage();
};

 */

















/* // Variables globales para los contenedores
const productContainer = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        let productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">Marca: ${product.marca}<br>Linea: ${product.linea}<br>Modelo: ${product.modelo}</p>
                        <p>Precio: $${product.precio.toLocaleString()}</p>
                        <p>Stock: ${product.stock}</p>
                        <input type="number" min="0" max="${product.stock}" value="0" class="form-control">
                        <button onclick="addToCart(${product.id})" class="btn btn-primary mt-2">Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
        container.innerHTML += productCard;
    });
}

if (productContainer) {
    // Si el contenedor de productos existe, asumimos que estamos en index.html
    renderProducts(productos.filter(p => p.marca === 'specialized'), 'productContainer');
} else if (cartContainer) {
    // Si el contenedor de carrito existe, asumimos que estamos en carrito.html
    // Aquí puedes cargar otros productos o dejarlo vacío si solo quieres mostrar el carrito
}

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        alert("No hay stock de este producto");
        return;
    }

    if (!cart[productId]) {
        cart[productId] = {...product, quantity: 1 };
    } else {
        cart[productId].quantity++;
    }

    alert(`Usted agregó ${product.nombre} al carrito`);
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const isCartAvailable = document.querySelector('#cartContainer'); // Corrección en el selector
    if (savedCart && isCartAvailable) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 
    let total = 0;
    Object.values(cart).forEach(item => {
        total += item.precio * item.quantity;
        let cartItem = `<p>${item.nombre}: ${item.quantity} x $${item.precio.toLocaleString()} = $${(item.precio * item.quantity).toLocaleString()}</p>`;
        cartContainer.innerHTML += cartItem;
    });

    if (Object.keys(cart).length > 0) {
        cartContainer.innerHTML += `<hr><p>Total: $${total.toLocaleString()}</p><button onclick="purchase()" class="btn btn-success">Comprar</button>`;
    } else {
        cartContainer.innerHTML = '<p>El carrito aún está vacío.</p>';
    }
}

function purchase() {
    if (Object.keys(cart).length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Su compra se realizó con éxito");
    localStorage.removeItem('cart');
}

window.onload = function() {
    loadCartFromLocalStorage();
};
 */
















// Variables globales para los contenedores
const productContainer = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');

function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    products.forEach(product => {
        let productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                    <img src="${product.img}" class="card-img-top" alt="${product.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">Marca: ${product.marca}<br>Linea: ${product.linea}<br>Modelo: ${product.modelo}</p>
                        <p>Precio: $${product.precio.toLocaleString()}</p>
                        <p>Stock: ${product.stock}</p>
                        <input type="number" min="0" max="${product.stock}" value="0" class="form-control">
                        <button onclick="addToCart(${product.id})" class="btn btn-primary mt-2">Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
        container.innerHTML += productCard;
    });
}

if (productContainer) {
    renderProducts(productos.filter(p => p.marca === 'specialized'), 'productContainer');
} else if (cartContainer) {
    // No se renderizan productos adicionales en carrito.html
}

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        alert("No hay stock de este producto");
        return;
    }

    if (!cart[productId]) {
        cart[productId] = {...product, quantity: 1 };
    } else {
        cart[productId].quantity++;
    }

    alert(`Usted agregó ${product.nombre} al carrito`);
    saveCartToLocalStorage();
    renderCart(); // Renderiza el carrito después de agregar un producto
}

function removeFromCart(productId) {
    delete cart[productId];
    saveCartToLocalStorage();
    renderCart(); // Vuelve a renderizar el carrito después de eliminar un producto
}

function emptyCart() {
    cart = {};
    saveCartToLocalStorage();
    renderCart(); // Vuelve a renderizar el carrito después de vaciarlo
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const isCartAvailable = document.querySelector('#cartContainer');
    if (savedCart && isCartAvailable) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = ''; 
    let total = 0;
    Object.entries(cart).forEach(([key, item]) => { // Usamos entries para obtener tanto key como value
        total += item.precio * item.quantity;
        let cartItem = `
            <tr>
                <td>${item.nombre}</td>
                <td>x ${item.quantity}</td>
                <td>$${(item.precio * item.quantity).toLocaleString()}</td>
                <td><button onclick="removeFromCart(${key})" class="btn btn-danger">Quitar Artículo</button></td>
            </tr>`;
        cartContainer.innerHTML += cartItem;
    });

    if (Object.keys(cart).length > 0) {
        cartContainer.innerHTML += `
            <tr>
                <td colspan="2"><strong>Total:</strong></td>
                <td>$${total.toLocaleString()}</td>
                <td>
                    <button onclick="purchase()" class="btn btn-success">Comprar</button>
                    <button onclick="emptyCart()" class="btn btn-warning ml-2">Vaciar Carrito</button>
                </td>
            </tr>`;
    } else {
        cartContainer.innerHTML = '<tr><td colspan="4">El carrito aún está vacío.</td></tr>';
    }
}

function purchase() {
    if (Object.keys(cart).length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Su compra se realizó con éxito");
    localStorage.removeItem('cart');
}

window.onload = function() {
    loadCartFromLocalStorage();
};
