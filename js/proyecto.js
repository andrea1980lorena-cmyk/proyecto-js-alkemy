// Arreglo global para almacenar las operaciones aduaneras
const operacionesComex = [];

// Configuración de idioma para la librería Moment.js
moment.locale("es");

// Funciones utilitarias idénticas a la estructura del profesor
function generarUUID() {
    return uuidv4();
}

function obtenerFechaSistema() {
    return moment().format("DD/MM/YYYY - HH:mm");
}

// =========================================================================
// CLASE CONSTRUCTORA CON POO (Adaptada a Comercio Exterior)
// =========================================================================
class CargaImportacion {
    constructor(codigoBl, descripcionCarga, regimenAduanero, cantidadContenedores, valorFobUSD) {
        this.id = generarUUID();                       // Identificador único de la operación
        this.codigoBl = codigoBl;                     // Documento Bill of Lading
        this.descripcionCarga = descripcionCarga;     // Mercancía declarada
        this.regimenAduanero = regimenAduanero;       // Vía de ingreso (Marítimo, Aéreo, etc.)
        this.cantidadContenedores = cantidadContenedores; // Volumen
        this.valorFobUSD = valorFobUSD;               // Valor FOB comercial
        this.fechaVisacion = obtenerFechaSistema();   // Timestamp de aduanas
    }

    // Método analítico para calcular el impuesto Ad-Valorem aproximado (6%)
    calcularImpuestoAduana() {
        return this.valorFobUSD * 0.06;
    }

    // Método para almacenar la instancia en el repositorio global
    registrarEnSistema() {
        operacionesComex.push(this);
    }
}

// =========================================================================
// MÓDULO DE INVENTARIO Y DESGLOSE EN CONSOLA
// =========================================================================
function mostrarManifiestoConsola(listaEmbarques = []) {
    console.log(`Total operaciones aduaneras registradas (${listaEmbarques.length}):`);
    if (listaEmbarques.length == 0) {
        return console.log("NO HAY EMBARQUES REGISTRADOS EN EL SISTEMA COMEX.");
    }
    
    console.log("_".repeat(60));
    for (const embarque of listaEmbarques) {
        let {
            codigoBl,
            descripcionCarga,
            regimenAduanero,
            cantidadContenedores,
            valorFobUSD,
            fechaVisacion,
        } = embarque;

        console.log("ID Único Aduana :", embarque.id);
        console.log("Documento B/L   :", codigoBl);
        console.log("Mercancía       :", descripcionCarga);
        console.log("Ruta Internación:", regimenAduanero);
        console.log("Contenedores    :", cantidadContenedores);
        console.log("Valor FOB (USD) :", `$${valorFobUSD.toLocaleString("en-US")}`);
        console.log("Arancel Est. 6% :", `$${embarque.calcularImpuestoAduana().toLocaleString("en-US")}`);
        console.log("Fecha Visación  :", fechaVisacion);

        console.log("\n");
        console.log("*".repeat(60));
        console.log("\n");
    }
}

// =========================================================================
// VALIDACIONES ROBUSTAS CON BUCLES (Mismas reglas que el profesor)
// =========================================================================
function validarCantidadContenedores() {
    let continuar = true;
    let cantidad;

    while (continuar) {
        cantidad = Number(prompt("Ingrese la cantidad de contenedores de la operación (Mayor a 0):"));

        if (isNaN(cantidad)) {
            alert("Error: Ha ingresado un valor no numérico. Intente nuevamente.");
        } else if (cantidad <= 0) {
            alert("Error: El despacho requiere un mínimo de 1 contenedor para ser visado.");
        } else {
            continuar = false;
        }
    }
    return cantidad;
}

function validarValorFob() {
    let continuar = true;
    let precio;

    while (continuar) {
        precio = Number(prompt("Ingrese el valor FOB de la carga en USD (mayor o igual a 0):"));

        if (isNaN(precio)) {
            alert("Error: Ha ingresado una cifra monetaria inválida. Intente de nuevo.");
        } else if (precio < 0) {
            alert("Error: El valor aduanero comercial no puede ser un monto negativo.");
        } else {
            continuar = false;
        }
    }
    return precio;
}

function validarRegimenAduanero() {
    let continuar = true;
    let regimen;

    while (continuar) {
        const rutasDisponibles = ["Maritimo", "Aereo", "Terrestre", "Multimodal"];

        let mensaje =
            "Seleccione la vía o régimen de transporte aduanero:\n" +
            `Opciones aceptadas: ${rutasDisponibles.join(", ")}.`;

        regimen = prompt(mensaje);

        // Control preventivo de nulidad
        if (!regimen) {
            alert("Debe escribir una opción válida.");
            continue;
        }

        // Normalizar entrada del usuario
        regimen = regimen.toLowerCase().trim();

        switch (regimen) {
            case "maritimo":
            case "marítimo":
                regimen = "Marítimo";
                continuar = false;
                break;
            case "aereo":
            case "aéreo":
                regimen = "Aéreo";
                continuar = false;
                break;
            case "terrestre":
                regimen = "Terrestre";
                continuar = false;
                break;
            case "multimodal":
                regimen = "Multimodal";
                continuar = false;
                break;
            default:
                alert("Régimen no homologado por aduanas. Ingrese una de las alternativas listadas.");
                break;
        }
    }
    return regimen;
}

// =========================================================================
// CONTROLADORES DE OPERACIONES
// =========================================================================
function tramitarNuevaImportacion() {
    let codigoBl = prompt("Ingrese el código del documento Bill of Lading (ej: MEDU987654):");
    let descripcionCarga = prompt("Ingrese la descripción de las mercancías:");
    let regimenAduanero = validarRegimenAduanero();
    let cantidadContenedores = validarCantidadContenedores();
    let valorFobUSD = validarValorFob();

    const nuevaCarga = new CargaImportacion(
        codigoBl,
        descripcionCarga,
        regimenAduanero,
        cantidadContenedores,
        valorFobUSD
    );

    nuevaCarga.registrarEnSistema();
    alert("Operación aduanera visada correctamente con el ID de tracking:\n" + nuevaCarga.id);
}

function filtrarPorRegimenTransporte() {
    let continuar = true;
    let regimen;

    let mensaje =
        "Filtro Avanzado de Manifiestos.\nIngrese el número del régimen que desea auditar:\n" +
        "1. Marítimo\n" +
        "2. Aéreo\n" +
        "3. Terrestre\n" +
        "4. Multimodal\n";

    while (continuar) {
        let opcion = prompt(mensaje);

        let mapaOpciones = {
            1: "Marítimo",
            2: "Aéreo",
            3: "Terrestre",
            4: "Multimodal",
        };

        regimen = mapaOpciones[opcion];

        if (regimen) {
            continuar = false;
        } else {
            alert("Selección inválida. Elija un número del 1 al 4.");
        }
    }

    // Aplicación del método filter para cumplir la rúbrica
    const cargasFiltradas = operacionesComex.filter((item) => item.regimenAduanero == regimen);

    console.log("Filtrando base de datos aduanera por canal: " + regimen);
    mostrarManifiestoConsola(cargasFiltradas);
}

// =========================================================================
// MENÚ INTERACTIVO PRINCIPAL
// =========================================================================
function desplegarMenuComex() {
    let mensaje =
        "🚢 SISTEMA ADUANERO DE CONTROL DE IMPORTACIONES (COMEX)\n" +
        "Seleccione una acción para iniciar:\n\n" +
        "1. Declarar nuevo ingreso de carga (DIN).\n" +
        "2. Ver manifiesto completo de aduanas.\n" +
        "3. Filtrar cargas por régimen de transporte.\n\n" +
        "Presione cancelar o cualquier otra tecla para salir.";

    let opcion = prompt(mensaje);

    switch (opcion) {
        case "1":
            tramitarNuevaImportacion();
            break;
        case "2":
            mostrarManifiestoConsola(operacionesComex);
            break;
        case "3":
            filtrarPorRegimenTransporte();
            break;
        default:
            alert("Cerrando sesión en el portal aduanero...");
            break;
    }
}

// =========================================================================
// ESCUCHADORES DE EVENTOS EN EL ELEMENTO DOM (Mismos ID que usa el profesor)
// =========================================================================
const btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", () => {
    desplegarMenuComex();
});

const btnVerInventario = document.getElementById("btnVerInventario");
btnVerInventario.addEventListener("click", () => {
    mostrarManifiestoConsola(operacionesComex);
});

const btnLimpiarConsola = document.getElementById("btnLimpiarConsola");
btnLimpiarConsola.addEventListener("click", () => {
    console.clear();
    console.log("Se han borrado los datos de la consola");
});