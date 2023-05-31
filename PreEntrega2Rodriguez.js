/*
Armando Rodríguez
PreEntrega2Rodriguez.js

-Creación de inventario
-Menú con el cleinte
-Lista de cosas compradas por el cliente
-Descuento en mayoreos
-Aplicar impuestos
-Imprimir compra total
-Actualizar inventario

*/

//Plano del constructor
function productos_Constructor(nombre, precio, stock){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}

//Arreglo de objetos para subir al plano del constructor
let productos = [
    producto_1 = new productos_Constructor("Croquetas", 800.00, 150),
    producto_2 = new productos_Constructor("Arena", 50.00, 250),
    producto_3 = new productos_Constructor("Premios", 20.50, 110),
    producto_4 = new productos_Constructor("Rascadero", 30.00, 50),
    producto_5 = new productos_Constructor("Cama", 100.00, 100),
    producto_6 = new productos_Constructor("Juguete", 15.00, 35)
];

//Arreglo vacío
let carrito = [];

//Para cada elemento del arreglo productos, llamar función generar_SKU
productos.forEach(producto =>{
    producto.SKU = generar_SKU();
})

//Función para generar un SKU
function generar_SKU() {
    //Número random de 3 números
    return Math.floor(Math.random() * 900) + 100; 
}

//Función para evaluar unidades compradas y descuento
evaluador = (x, producto) => {
    //Cantidad de descuentos
    let descuento_1 = 0.1;
    let descuento_2 = 0.2;
    let descuento_3 = 0.3;

    let unidades = parseInt(prompt("¿Cuántas unidades quieres?"));

    //Revisar si hay stock de las unidades seleccionadas
    if(unidades<=productos[x].stock){
        let precio_Unidades = unidades*productos[x].precio;

        if (10<=unidades && unidades<=19){//Rango de unidades y su descuento en mayoreo
            precio_Unidades -= (precio_Unidades*descuento_1);
            alert("Descuento 10%");
        }else if(20<=unidades && unidades<=29){
            precio_Unidades -= (precio_Unidades*descuento_2);
            alert("Descuento 20%");
        }else if(unidades>=30){
            precio_Unidades -= (precio_Unidades*descuento_3);
            alert("Descuento 30%");
        }

        //Actualizar stock
        productos[x].stock -= unidades;

        //Empujar selección al arreglo vacío
        carrito.push({producto, unidades, precio_Unidades});

        //Imprimir carrito
        console.log(carrito);
    }else{
        //Si no hay stock
        alert("No tenemos inventario");
    }
}

//Mensaje de despedida
despedida = ( ) => alert("Hasta pronto");

//Mensaje de bienvenida
let decision = prompt("¡Un gusto atender con nuestro mayoreo y menudeo en tienda para gatos!\n ¿Deseas comprar en nuestra tienda? (SI/NO)");

//Si opción no está en menú o es escrita incorrectamente
while(decision != "SI" && decision != "NO"){
    alert("Opción inválida, por favor seleccione  (SI/NO)");
    //Repetir pregunta
    decision = prompt ("¿Desea comprar con nosotros?");
}

//Si decisión es afirmativa
if(decision == "SI"){
    alert("Lista de productos: ");

    //Crear un nuevo array con los elementos de arreglo productos, pero con parámetros que quiero que vea el cliente
    let inventario = productos.map(
        (productos) => productos.nombre + ", precio: $" + productos.precio
    );
    
    //Unir todo con un salto de línea
    alert(inventario.join("\n"));
}else if(decision == "NO"){ //Si ya no quiere comprar
    //Mensaje de despedida
    despedida();
}


//Mientras la decisión no sea NO
while(decision != "NO"){
    let producto = prompt("¿Cuál deseas agregar producto al carrito?");

    let precio = 0;
    let x = 0;//Index del producto

    if(
    producto === producto_1.nombre    || //Si la opción existe en el menú
    producto === producto_2.nombre    || 
    producto === producto_3.nombre    || 
    producto === producto_4.nombre    ||
    producto === producto_5.nombre    || 
    producto === producto_6.nombre){
        switch(producto){
            case producto_1.nombre :
                precio = productos[0].precio;
                break;
            case producto_2.nombre:
                precio = productos[1].precio;
                x = 1;//Actualizar X como index del producto
                break;
            case producto_3.nombre:
                precio = productos[2].precio;
                x = 2;//Actualizar X como index del producto
                break;
            case producto_4.nombre:
                precio = productos[3].precio;
                x = 3;//Actualizar X como index del producto
                break;
            case producto_5.nombre:
                precio = productos[4].precio;
                x = 4;//Actualizar X como index del producto
                break;
            case producto_6.nombre:
                precio = productos[5].precio;
                x = 5;//Actualizar X como index del producto
                break;
            default:
                alert("Opción inválida");
                break;
        }
        //Función para evaluar mayoreo o menudeo
        evaluador(x, producto);
    }
    decision = prompt("¿Desea comprar algo más? (SI/NO)");
    while(decision == "NO"){
        //Mensaje de despedida
        despedida();
        break;
    }
}

//Reducir el arreglo
let totalPagar = carrito.reduce((total, producto) => total + producto.precio_Unidades, 0); //0 como valor inicial del acumulador
totalPagar = parseFloat(totalPagar.toFixed(2));//Redondear a dos decimales

//Calcular impuesto
let totalPagarTAX = totalPagar * 0.16;
totalPagarTAX = parseFloat(totalPagarTAX.toFixed(2));//Redondear a dos decimales

//Imprimir los totales
alert(`Favor de pagar: $${totalPagar} impuesto de: $${totalPagarTAX} incluído`);

//Imprimir inventario actualizado
console.log("Inventario actualizado ",productos);

/*
FIN DE CÓDIGO
*/