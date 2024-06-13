Buenos días Lucas, muchas gracias por la entrega del proyecto, te felicito por lo que lograste, funciona genial y cumple con lo que se pide.


Hay una cosita para corregir, que sería la parte donde estas agregando un producto al carrito y queres renderizar los productos en el mismo.


Vas a ver en la consola que hay un error en la linea 101 del JS donde vos le estas pasando el id a al función renderProducts
y se debe renderizar los productos correspondientes a ese contenedor. El problema está en que cuando vos cargas el carrito.html
no le estas padando el id del carrito, entonces lo que yo te recomiendo es que dependiendo del html en el que esté vos renderizes
una función u otra. Además de que si vos cargas el index, también te sale un error en la linea 143 donde no encuentra el "cartContainer".


Entonces para solucionarlo podes hacer lo siguiente:



1) Si vos estas en el index.html vos no queres que se renderize la función de "renderCart" entonces, lo que podes hacer es un if 
en el que primero captures el Id "cartContainer y si existe, entonces ahí ejecutas la función.



function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    const isCartAvailable = docuem.querySelector('.cartContainer')
    if (savedCart && isCartAvailable) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}
De esta forma vas a ver que tratas de capturar el id del cartContainer y si no lo encuentra no va a entrar en el if.



2) Lo podes repetir también en la parte del render de productos en general.



function renderProducts(products,containerId) {
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


const container = document.getElementById('productContainer');
const cartContainer = document.getElementById('cartContainer');
container ? renderProducts(productos.filter(p => p.marca === 'specialized'),'productContainer') : renderProducts(productos.filter(p => p.marca === 'specialized'),'cartContainer');


Abajo capturas ambos contenedores y luego con un operador ternario preguntas si existe container, si existe entonces ejecutas la función para el index.html,
sinó ejecutás la del carrito.



Obvio que esto lo hice para esos casos en particular.



Lo que te dejo de tarea sería por ejemplo, capturar los contenedores arriba del todo como variables globales,
entonces las podes usar en todo el código y no tenes que estar capturándolas en todos lados. 



3) Fijate también las rutas de las img que en todos los html excepto el del index están rotas. 



Por lo demás esta excelente el trabajo y el proyecto funciona muy bien. Te felicito!



A seguir aprendiendo!




















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

 */

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
} */



