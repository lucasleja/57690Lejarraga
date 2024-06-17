class Producto {
    constructor(id, nombre, marca, linea, modelo, stock, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.linea = linea;
        this.modelo = modelo;
        this.stock = stock;
        this.precio = precio;
        this.img = img;
    }
}

const productos = [];

let producto1 = new Producto(1, "bicicleta mtb", "specialized", "rockhopper", "sport", 25, 800000, "./img/specialized/1.webp");
let producto2 = new Producto(2, "bicicleta mtb", "specialized", "epic", "comp carbon", 15, 3000000, "./img/specialized/2.webp");
let producto3 = new Producto(3, "bicicleta electrica", "specialized", "turbo Levo", "comp carbon", 10, 5000000, "./img/specialized/3.webp");
let producto4 = new Producto(4, "bicicleta mtb", "specialized", "rockhopper", "expert", 15, 4000000, "./img/specialized/4.webp");
let producto5 = new Producto(5, "bicicleta ruta", "specialized", "tarmac", "sl6", 20, 5000000, "./img/specialized/5.webp");
let producto6 = new Producto(6, "bicicleta ruta", "specialized", "tarmac", "sl7", 5, 5000000, "./img/specialized/6.webp");

productos.push(producto1, producto2, producto3, producto4, producto5, producto6);

async function cargarProductos() {
    try {
        const respuesta = await fetch('productos2.json');
        const datos = await respuesta.json();
        const productosAgregados = datos.productos2.map(producto => new Producto(
            producto.id,
            producto.nombre,
            producto.marca,
            producto.linea,
            producto.modelo,
            producto.stock,
            producto.precio,
            producto.img
        ));

        productos.push(...productosAgregados);
        console.log(`Total de productos después de cargar desde JSON: ${productos.length}`);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

cargarProductos().then(() => {
    console.log(`Total de productos en el array: ${productos.length}`);
    renderAllProducts();
});

const productContainer = document.getElementById('productContainer');

function renderAllProducts() {
    let rowContainer = document.createElement('div');
    rowContainer.className = 'row';

    productos.forEach(product => {
        let productCard = `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card">
                <div class="card-image-container">
                    <img src="${product.img}" class="card-img-top" alt="${product.nombre}">
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">Marca: ${product.marca}<br>Linea: ${product.linea}<br>Modelo: ${product.modelo}</p>
                        <p>Precio: $${product.precio.toLocaleString()}</p>
                        <p>Stock: ${product.stock}</p>
                        <input type="number" id="quantity-${product.id}" min="0" max="${product.stock}" value="0" class="form-control">
                        <button onclick="addToCart(${product.id}, document.getElementById('quantity-${product.id}').value)" class="btn btn-primary mt-2">Agregar al Carrito</button>
                    </div>
                </div>
            </div>`;
    
        rowContainer.innerHTML += productCard;
    });

    productContainer.appendChild(rowContainer);
}

let cart = JSON.parse(localStorage.getItem('cart')) || {};

function addToCart(productId, quantity) {
    const product = productos.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        Swal.fire({
            title: "Error",
            text: "No hay stock de este producto",
            icon: "error"
        });
        return;
    }

    quantity = parseInt(quantity, 10);

    if (!cart[productId]) {
        cart[productId] = {...product, quantity: quantity};
    } else {
        cart[productId].quantity += quantity;
    }

    Swal.fire({
        title: "Producto Agregado",
        text: `Usted agregó ${quantity} ${product.nombre} al carrito`,
        icon: "success"
    });
    saveCartToLocalStorage();
}

function removeFromCart(productId) {
    delete cart[productId];
    saveCartToLocalStorage();
    renderCart();
}

function emptyCart() {
    cart = {};
    saveCartToLocalStorage();
    renderCart();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

window.onload = function() {
    loadCartFromLocalStorage();
};

if (document.getElementById('cartContainer')) {
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';
    let total = 0;
    Object.entries(cart).forEach(([key, item]) => {
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
        Swal.fire({
            title: "Carrito Vacío",
            text: "El carrito está vacío",
            icon: "warning"
        });
        return;
    }
    Swal.fire({
        title: "Compra Realizada",
        text: "Su compra se realizó con éxito",
        icon: "success"
    });
    localStorage.removeItem('cart');
    cart = {};
    renderCart();
}

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