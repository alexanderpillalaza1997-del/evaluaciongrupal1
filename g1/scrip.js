// 1. Arreglo global de estudiantes
let estudiantes = [];

// 2. Función principal para Guardar/Actualizar
function guardarEstudiante() {
    // Captura de valores
    const nombre = document.getElementById("txtNombre").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();
    const id = document.getElementById("txtId").value.trim();

    // Limpiar errores previos
    limpiarErrores();

    let esValido = true;

    // --- VALIDACIONES ---
    
    // Nombre: No vacío, solo letras/espacios, inicia con mayúscula
    const regexNombre = /^[A-Z][a-zA-Z\s]*$/;
    if (nombre === "") {
        mostrarError("errNombre", "El nombre es obligatorio.");
        esValido = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        mostrarError("errNombre", "El nombre solo puede contener letras y espacios.");
        esValido = false;
    } else if (!/^[A-Z]/.test(nombre)) {
        mostrarError("errNombre", "La primera letra debe ser mayúscula.");
        esValido = false;
    }

    // Correo: No vacío y formato válido
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo === "") {
        mostrarError("errCorreo", "El correo es obligatorio.");
        esValido = false;
    } else if (!regexCorreo.test(correo)) {
        mostrarError("errCorreo", "Ingrese un correo válido.");
        esValido = false;
    }

    // ID: No vacío y solo números
    if (id === "") {
        mostrarError("errId", "El ID es obligatorio.");
        esValido = false;
    } else if (isNaN(id)) {
        mostrarError("errId", "El ID debe tener solo números.");
        esValido = false;
    }

    // --- PROCESAMIENTO ---
    if (esValido) {
        // Buscar si el ID ya existe
        let indiceExistente = estudiantes.findIndex(e => e.id === id);

        if (indiceExistente !== -1) {
            // Actualizar
            estudiantes[indiceExistente].nombre = nombre;
            estudiantes[indiceExistente].correo = correo;
        } else {
            // Agregar nuevo
            const nuevoEstudiante = { id, nombre, correo };
            estudiantes.push(nuevoEstudiante);
        }

        // Limpiar formulario y actualizar vista
        limpiarFormulario();
        actualizarTabla();
    }
}

// 3. Función para Eliminar Estudiante
function eliminarEstudiante() {
    const idEliminar = document.getElementById("txtIdEliminar").value.trim();
    const errEliminar = document.getElementById("errEliminar");
    errEliminar.innerText = "";

    if (idEliminar === "") {
        errEliminar.innerText = "Ingresa un ID para eliminar.";
        return;
    }

    // Buscar índice
    let index = estudiantes.findIndex(e => e.id === idEliminar);

    if (index !== -1) {
        // Uso obligatorio de splice(index, 1)
        estudiantes.splice(index, 1);
        actualizarTabla();
        document.getElementById("txtIdEliminar").value = "";
        alert("Estudiante eliminado correctamente.");
    } else {
        errEliminar.innerText = "No se encontró un estudiante con ese ID.";
    }
}

// 4. Funciones de Apoyo (UI)
function actualizarTabla() {
    const tabla = document.getElementById("tablaEstudiantes");
    tabla.innerHTML = ""; // Limpiar tabla

    estudiantes.forEach(est => {
        let fila = `<tr>
            <td>${est.id}</td>
            <td>${est.nombre}</td>
            <td>${est.correo}</td>
        </tr>`;
        tabla.innerHTML += fila;
    });
}

function mostrarError(idElemento, mensaje) {
    document.getElementById(idElemento).innerText = mensaje;
}

function limpiarErrores() {
    const errores = document.querySelectorAll(".error-msg");
    errores.forEach(err => err.innerText = "");
}

function limpiarFormulario() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtId").value = "";
    limpiarErrores();
}

// Desaparecer errores mientras el usuario escribe (Opcional pero recomendado en la rúbrica)
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        const errorSpan = input.nextElementSibling;
        if(errorSpan && errorSpan.classList.contains("error-msg")){
            errorSpan.innerText = "";
        }
    });
});