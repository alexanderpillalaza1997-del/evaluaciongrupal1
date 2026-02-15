
cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
}

mostrarCuentas = function () {
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
    let tabla = "<table><tr><th>Cuenta</th><th>Nombre y Apellido</th><th>Saldo</th></tr>";
    for (let i = 0; i < cuentas.length; i++) {
        tabla += "<tr><td>" + cuentas[i].numeroCuenta + "</td><td>" + cuentas[i].nombre + " " + cuentas[i].apellido + "</td><td>" + cuentas[i].saldo + "</td></tr>";
    }
    tabla += "</table>";
    mostrarTextoDiv("infoCuentas", tabla);
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada = null;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            cuentaEncontrada = cuentas[i];
            break;
        }
    }
    return cuentaEncontrada;
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
    //Si ya existe mostrar un alert CUENTA EXISTENTE
    //Si se agrega, mostrar un alert CUENTA AGREGADA
    let encontrado = false;
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == cuenta.numeroCuenta) {
            encontrado = true;
            break;
        } else {
            encontrado = false;
        }
    }
    if (!encontrado) {
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
        return true;
    }
    alert("CUENTA EXISTENTE");
    return false;
}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    //Invoca a agregarCuenta
    //Invoca a mostrarCuentas

    let valorCedula = recuperarTexto("txtCedula");
    let valorNombre = recuperarTexto("txtNombre");
    let valorApellido = recuperarTexto("txtApellido");
    let valorCuenta = recuperarTexto("txtCuenta");
    let auxcuenta = {};
    auxcuenta.numeroCuenta = valorCuenta;
    auxcuenta.cedula = valorCedula;
    auxcuenta.nombre = valorNombre;
    auxcuenta.apellido = valorApellido;
    auxcuenta.saldo = 0.0;
    agregarCuenta(auxcuenta);
    mostrarCuentas();
}

mostrarTextoDiv = function (idComponente, mensaje) {
    let componente;
    componente = document.getElementById(idComponente);
    componente.innerHTML = mensaje;
}
