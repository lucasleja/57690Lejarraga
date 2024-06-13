

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



productos.push(producto1, producto2, producto3, producto4, producto5, producto6);

console.log(productos)

console.table(productos)

// Función para leer el archivo JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch('productos2.json'); // Reemplaza 'ruta/a/' con la ruta real a tu archivo
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
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Llamar a la función para cargar los productos adicionales
cargarProductos();

console.log(productos); // Para verificar que los productos se han agregado correctamente


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








function renderProductsByBrand(products, brand, containerId) {
    const container = document.getElementById(containerId);
    let rowContainer = document.createElement('div');
    rowContainer.className = 'row';

    products.filter(p => p.marca.toLowerCase() === brand.toLowerCase()).forEach(product => {
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
        
        rowContainer.innerHTML += productCard;
    });

    container.appendChild(rowContainer);
}



// Para index.html
function loadSpecializedProducts() {
    renderProductsByBrand(productos, 'specialized', 'productContainer');
}

// Para cannondale.html
function loadCannondaleProducts() {
    renderProductsByBrand(productos, 'cannondale', 'cannondaleProductContainer');
}

// Para trek.html
function loadTrekProducts() {
    renderProductsByBrand(productos, 'trek', 'trekProductContainer');
}




document.addEventListener('DOMContentLoaded', () => {
    if (location.pathname.includes('/index.html')) {
        loadSpecializedProducts();
    } else if (location.pathname.includes('/cannondale.html')) {
        loadCannondaleProducts();
    } else if (location.pathname.includes('/trek.html')) {
        loadTrekProducts();
    }
});
