/* MAYOISTA DE BICICLETAS */

/* Usuario ingresa su nombre */

let holaUsuario = prompt("Bienvenido, ingrse su nombre")

/* Ahora se saluda al usuario */

let saludoUsuario = alert("Hola " + holaUsuario)

/* Constructor de objeto class-constructor */

class Producto{
    constructor(id, nombre, marca, modelo, stock, precio ){
        this.id = id
        this.nombre = nombre
        this.marca = marca
        this.modelo = modelo
        this.stock = stock
        this.precio = precio

        this.vender = function(cantidad){
            if(cantidad>this.stock){
                alert("no hay suficiente stock")
            }else{
                this.stock -= cantidad
                alert(`se vendieron ${cantidad} unidades de ${this.tipo} ${this.marca}, quedan ${this.stock}`)
            }
        }
    }
}




/* El administrador tiene la posibilidad ingresas los nuevos artículos a la tienda (ahora si e admin llega a poner un ID ya existente no se ue pueda llegar a pasar XD) */

function creadorProductos(){
    let id=parseInt(prompt("ingrese el ID del producto"))
    let nombre=prompt("ingrese el nombre de producto")
    let marca=prompt(("ingrese la marca del producto"))
    let modelo=prompt(("ingrese el modelo del producto"))
    let stock=parseInt(prompt("ingrese el stock del prodcuto"))
    let precio=prompt(("ingrese el precio del producto"))

    productos.push(new Producto(id, nombre, marca, modelo, stock, precio))

    /* let cantidadVender = parseInt(prompt("ingrese la cantidad a vender"))

    producto1.vender(cantidadVender) */
}

/* El llamado a la función para crear objetos queda comentada, pero se puede llamar mediante la consola y funciona perfectamente para agregar objetos (productos) al array de objetos creado abajo */

/* creadorProductos() */




/* Array para almacenar productos */

let productos = []

/* Productos creados */

productos.push(new Producto(2, "bicicleta", "specialized", "rockhopper", 25, 800000))
productos.push(new Producto(3, "bicicleta", "specialized", "epic", 15, 3000000))
productos.push(new Producto(4, "bicicleta Electrica", "specialized", "turvo Levo", 10, 5000000))
productos.push(new Producto(5, "bicicleta", "specialized", "rockhopper expert", 15, 4000000))
productos.push(new Producto(6, "bicicleta", "specialized", "tarmac", 20, 5000000))

/* console.log para visualizar array de objetos creados */

console.log(productos)



/* La función de fitar producto va a buscar bicicleta por modelo de biciceta */

function filtrarProducto(){
    let palabraClave = prompt("Ingrese el modelo que busca").trim().toUpperCase()
    let resultado = productos.filter((producto)=>producto.modelo.toUpperCase().includes(palabraClave))

    if(resultado.length > 0){
        confirm("Tenemos ese producto, queés comprar?")
    }else{
        alert("No tenemos ese modelo")
    }
}









