// ==========================================================================
// PUNTO 1: INTRODUCCIÓN AL LENGUAJE JAVASCRIPT (Lección #1 - Ref: image_34da9c.png)
// Objetivo: Sintaxis básica, uso de logs, prompt y alertas.
// ==========================================================================

console.log("=== SISTEMA INICIALIZADO EXITOSAMENTE ==="); // Mensaje simple en consola
alert("¡Bienvenido al Sistema de Gestión de Inventario de la Tienda!"); // Alerta inicial personalizada

// ==========================================================================
// PUNTO 2: VARIABLES, EXPRESIONES Y SENTENCIAS CONDICIONALES (Lección #2 - Ref: image_34dda7.png)
// Objetivo: Uso de let y const, operaciones matemáticas e if/else/switch.
// ==========================================================================

// Definición de constantes del sistema
const IVA_FACTOR = 0.19; // 19% impuesto de valor agregado

// Uso de prompt para capturar y almacenar datos numéricos en variables let
let precioBaseProducto = parseFloat(prompt("Lección 2: Ingrese el precio base del primer artículo de prueba:"));
let cantidadDeseada = parseInt(prompt("Lección 2: Ingrese la cantidad que desea simular para la venta:"));

// Control de flujo condicional e implementación de operaciones matemáticas directas
if (isNaN(precioBaseProducto) || isNaN(cantidadDeseada) || precioBaseProducto <= 0 || cantidadDeseada <= 0) {
    console.log("Alerta de Lección 2: Se ingresaron datos inválidos. Se usarán valores por defecto (1000 y 1).");
    precioBaseProducto = 1000;
    cantidadDeseada = 1;
}

// Operaciones aritméticas básicas incorporadas directamente
let subtotalVenta = precioBaseProducto * cantidadDeseada; // Multiplicación
let calculoImpuesto = subtotalVenta * IVA_FACTOR;
let totalConImpuesto = subtotalVenta + calculoImpuesto; // Suma

console.log(`[Lección 2] Datos Iniciales - Subtotal: $${subtotalVenta} | IVA: $${calculoImpuesto} | Total Neto: $${totalConImpuesto}`);

// ==========================================================================
// PUNTO 4: FUNCIONES EN JAVASCRIPT (Lección #4 - Ref: image_34de05.png)
// Objetivo: Modularización, paso de parámetros, retornos y anidación de funciones.
// NOTA: Se adelanta la declaración de funciones para ser utilizadas en los flujos de datos posteriores.
// ==========================================================================

// Función Matemática Individual: Adición de dos valores
function calcularSuma(valorA, valorB) {
    return valorA + valorB;
}

// Función Matemática Individual: Sustracción / Descuentos
function calcularResta(totalActual, descuento) {
    return totalActual - descuento;
}

// Función Matemática Individual: Multiplicación de factores
function calcularMultiplicacion(cantidad, precioUnitario) {
    return cantidad * precioUnitario;
}

// Función Matemática Individual: División para promedios de costos
function calcularDivision(totalAcumulado, cantidadElementos) {
    if (cantidadElementos === 0) return 0;
    return totalAcumulado / cantidadElementos;
}

// Función modular avanzada que recibe parámetros, procesa y retorna un resultado complejo
// Además, demuestra el requerimiento de llamar funciones dentro de otras funciones
function procesarCostoConDescuentoEImpuesto(cantidad, precio, tasaDescuento) {
    // Llamado interno a la función de multiplicación para optimizar
    let bruto = calcularMultiplicacion(cantidad, precio);
    let montoDescuento = bruto * (tasaDescuento / 100);
    
    // Llamado interno a la función de resta
    let conDescuento = calcularResta(bruto, montoDescuento);
    let impuesto = conDescuento * IVA_FACTOR;
    
    // Llamado interno a la función de suma para retornar el resultado final optimizado
    return calcularSuma(conDescuento, impuesto);
}

// ==========================================================================
// PUNTO 3: ARREGLOS Y CICLOS (Lección #3 - Ref: image_34de05.png)
// Objetivo: Arreglos elementales, recorrido con for/while y función de filtrado.
// ==========================================================================

// Creación de un arreglo básico con una lista de elementos (precios históricos de auditoría)
const registroPreciosHistoricos = [1500, 4200, 890, 6300, 1200, 5500, 3100];

console.log("\n--- [Lección 3] Recorrido de Arreglo con bucle FOR ---");
// Uso de FOR clásico para recorrer arreglos
for (let i = 0; i < registroPreciosHistoricos.length; i++) {
    console.log(`Índice Historial [${i}]: $${registroPreciosHistoricos[i]}`);
}

console.log("\n--- [Lección 3] Recorrido de Arreglo con bucle WHILE ---");
// Uso de WHILE para recorrer arreglos
let indiceWhile = 0;
while (indiceWhile < registroPreciosHistoricos.length) {
    console.log(`Precio Evaluado con While: $${registroPreciosHistoricos[indiceWhile]}`);
    indiceWhile++;
}

// Función que filtra elementos del arreglo según una condición específica
function filtrarPreciosMayoresA(limiteFiltro) {
    let preciosFiltrados = [];
    for (let i = 0; i < registroPreciosHistoricos.length; i++) {
        if (registroPreciosHistoricos[i] > limiteFiltro) {
            preciosFiltrados.push(registroPreciosHistoricos[i]);
        }
    }
    return preciosFiltrados;
}

let preciosAltos = filtrarPreciosMayoresA(3000);
console.log(`[Lección 3] Resultados del filtro (Precios mayores a $3000): [${preciosAltos.join(", ")}]`);

// ==========================================================================
// PUNTO 5: CONCEPTOS BÁSICOS DE OBJETOS EN JAVASCRIPT (Lección #5 - Ref: image_34de60.png)
// Objetivo: Objetos con propiedades y valores, métodos internos, arreglos de objetos y map/forEach.
// ==========================================================================

console.log("\n--- [Lección 5] Estructuras de Objetos Complejas ---");

// Creación de un objeto con propiedades, valores y métodos internos incorporados
const sucursalTienda = {
    nombre: "Central Alkemy Store",
    direccion: "Av. Aprendizaje Interactivo 404",
    activo: true,
    // Método interno del objeto
    obtenerPresentacion: function() {
        return `Establecimiento comercial: ${this.nombre} | Ubicación: ${this.direccion}`;
    }
};

// Ejecución del método del objeto
console.log(sucursalTienda.obtenerPresentacion());

// Uso de un arreglo de objetos complejos para representar los artículos reales de la tienda
const catalogoProductos = [
    { id: 101, descripcion: "Teclado Mecanico", categoria: "Tecnologia", costoBase: 25000, stock: 15 },
    { id: 102, descripcion: "Mouse Optico", categoria: "Tecnologia", costoBase: 12000, stock: 8 },
    { id: 103, descripcion: "Cuaderno Profesional", categoria: "Papeleria", costoBase: 3500, stock: 45 },
    { id: 104, descripcion: "Monitor 24 Pulgadas", categoria: "Tecnologia", costoBase: 95000, stock: 3 }
];

console.log("\n--- [Lección 5] Iteración de Arreglos de Objetos usando forEach() ---");
// Uso de forEach() para recorrer el arreglo de objetos y mostrar estados de almacén
catalogoProductos.forEach(function(producto) {
    let disponibilidad = producto.stock > 10 ? "STOCK SEGURO" : "RESERVA CRÍTICA";
    console.log(`Producto: ${producto.descripcion} -> Estado operativo: ${disponibilidad}`);
});

console.log("\n--- [Lección 5] Transformación de Datos usando map() ---");
// Uso de map() para procesar los objetos y generar un listado de precios finales simulados con impuestos
const listaPreciosConsolidados = catalogoProductos.map(function(producto) {
    // Llama a la función matemática del punto 4 dentro del mapeo para máxima optimización
    let precioFinalCalculado = procesarCostoConDescuentoEImpuesto(1, producto.costoBase, 10); // 10% descuento promocional
    return {
        articulo: producto.descripcion.toUpperCase(),
        precioVentaNeto: parseFloat(precioFinalCalculado.toFixed(2))
    };
});

// Imprimir resultado de la transformación map()
console.table(listaPreciosConsolidados);

// ==========================================================================
// CONTROL DE EJECUCIÓN DINÁMICA MEDIANTE PROMPT INTERACTIVO CONTINUO
// Interconecta todas las operaciones construidas a lo largo de las lecciones
// ==========================================================================
function inicializarMenuInteractivo() {
    let mantenerMenuActivo = true;

    while (mantenerMenuActivo) {
        let seleccion = prompt(
            "=== INTERFAZ INTERACTIVA DE INVENTARIO ===\n" +
            "Ingrese el número de la operación que desea ejecutar:\n\n" +
            "1. Mostrar catálogo en consola con forEach()\n" +
            "2. Ver simulación de precios finales de venta con map()\n" +
            "3. Ejecutar cálculo rápido de costo (Función del Punto 4)\n" +
            "4. Salir del programa"
        );

        switch (seleccion) {
            case "1":
                console.clear();
                console.log("--- CATÁLOGO ACTUAL DE PRODUCTOS (forEach) ---");
                catalogoProductos.forEach(p => {
                    console.log(`ID: ${p.id} | ${p.descripcion} | Costo Unitario: $${p.costoBase} | Stock: ${p.stock}`);
                });
                alert("Catálogo impreso en la consola.");
                break;
                
            case "2":
                console.clear();
                console.log("--- PROYECCIÓN DE VALORES DE VENTA NETOS (map) ---");
                console.table(listaPreciosConsolidados);
                alert("Tabla de precios proyectados cargada en consola con éxito.");
                break;
                
            case "3":
                let cant = parseInt(prompt("Ingrese la cantidad de unidades a simular:"));
                let val = parseFloat(prompt("Ingrese el precio del producto:"));
                let desc = parseFloat(prompt("Ingrese el porcentaje de descuento a aplicar (0 a 100):"));
                
                if (!isNaN(cant) && !isNaN(val) && !isNaN(desc)) {
                    let totalSimulado = procesarCostoConDescuentoEImpuesto(cant, val, desc);
                    alert(`El resultado final procesado (con descuento e IVA incluido) es: $${totalSimulado.toFixed(2)}`);
                    console.log(`[Cálculo Manual] Cantidad: ${cant} | Valor Base: $${val} | Descuento: ${desc}% | Neto Final: $${totalSimulado.toFixed(2)}`);
                } else {
                    alert("Error: Valores numéricos incorrectos.");
                }
                break;
                
            case "4":
            case null:
                alert("Finalizando la ejecución del software de simulación. Muchas gracias.");
                mantenerMenuActivo = false;
                break;
                
            default:
                alert("Opción no válida. Por favor introduzca un número del 1 al 4.");
                break;
        }
    }
}

// Retarda el inicio de la aplicación interactiva para permitir la lectura de los logs iniciales en pantalla
setTimeout(inicializarMenuInteractivo, 1000);