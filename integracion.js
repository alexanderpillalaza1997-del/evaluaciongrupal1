cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]

/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


// --- FUNCIONES DE NAVEGACIÓN ---
cargar = function() {
    mostrarCuentasApp();
}

mostrarCuentasApp = function() {
    mostrarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    mostrarCuentas();
}

mostrarTransaccionesApp = function() {
    ocultarComponente("divCuentas");
    mostrarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
}

mostrarMovimientosApp = function() {
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    mostrarComponente("divMovimientos");
}

// --- LÓGICA DE CUENTAS ---
buscarCuenta = function(numeroCuenta) {
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i];
        }
    }
    return null;
}

mostrarCuentas = function() {
    let tabla = "<table class='tabla'><tr><th>CUENTA</th><th>NOMBRE</th><th>SALDO</th></tr>";
    for (let i = 0; i < cuentas.length; i++) {
        tabla += "<tr><td>" + cuentas[i].numeroCuenta + "</td>" +
                 "<td>" + cuentas[i].nombre + " " + cuentas[i].apellido + "</td>" +
                 "<td>" + cuentas[i].saldo.toFixed(2) + "</td></tr>";
    }
    tabla += "</table>";
    document.getElementById("areaTablasCuentas").innerHTML = tabla;
}

agregar = function() {
    let ced = document.getElementById("txtCedula").value;
    let nom = document.getElementById("txtNombre").value;
    let ape = document.getElementById("txtApellido").value;
    let num = document.getElementById("txtNumeroCuenta").value;

    if (buscarCuenta(num) == null) {
        cuentas.push({ cedula: ced, nombre: nom, apellido: ape, numeroCuenta: num, saldo: 0.0 });
        alert("CUENTA AGREGADA");
        mostrarCuentas();
    } else {
        alert("CUENTA EXISTENTE");
    }
}

// --- LÓGICA DE TRANSACCIONES ---
ejecutarBusqueda = function() {
    let num = document.getElementById("txtBusquedaCuenta").value;
    let cuenta = buscarCuenta(num);
    if (cuenta != null) {
        document.getElementById("lblCliente").innerHTML = cuenta.nombre + " " + cuenta.apellido;
        document.getElementById("lblSaldo").innerHTML = cuenta.saldo.toFixed(2);
        document.getElementById("btnDepositar").disabled = false;
        document.getElementById("btnRetirar").disabled = false;
    } else {
        alert("CUENTA NO ENCONTRADA");
        document.getElementById("btnDepositar").disabled = true;
        document.getElementById("btnRetirar").disabled = true;
    }
}


ejecutarDeposito = function() {
    let num = document.getElementById("txtBusquedaCuenta").value;
    let cajaMonto = document.getElementById("txtMonto").value;
    let monto = parseFloat(cajaMonto); // Convertir a número decimal
    
    let cuenta = buscarCuenta(num);
    
    if (cuenta != null && !isNaN(monto)) {
        cuenta.saldo = parseFloat(cuenta.saldo) + monto; // Asegurar que ambos sean números
        
        // Registro de Movimiento tipo C
        movimientos.push({ numeroCuenta: num, monto: monto, tipo: "C" });
        
        alert("DEPÓSITO EXITOSO");
        // Actualizar el saldo en pantalla
        document.getElementById("lblSaldo").innerHTML = cuenta.saldo.toFixed(2);
    } else {
        alert("Monto no válido o cuenta no seleccionada");
    }
}

ejecutarRetirar = function() {
    let num = document.getElementById("txtBusquedaCuenta").value;
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let cuenta = buscarCuenta(num);

    if (cuenta != null && !isNaN(monto)) {
        if (cuenta.saldo >= monto) {
            cuenta.saldo = parseFloat(cuenta.saldo) - monto;
            
            movimientos.push({ numeroCuenta: num, monto: monto, tipo: "D" });
            alert("RETIRO EXITOSO");
            document.getElementById("lblSaldo").innerHTML = cuenta.saldo.toFixed(2);
        } else {
            alert("SALDO INSUFICIENTE");
        }
    }
}

// --- LÓGICA DE MOVIMIENTOS ---
ejecutarFiltrarMovimientos = function() {
    let num = document.getElementById("txtFiltroMov").value;
    let filtrados = [];
    for (let i = 0; i < movimientos.length; i++) {
        if (movimientos[i].numeroCuenta == num) {
            filtrados.push(movimientos[i]);
        }
    }
    
    let tabla = "<table class='tabla'><tr><th>CUENTA</th><th>MONTO</th><th>TIPO</th></tr>";
    for (let i = 0; i < filtrados.length; i++) {
        let displayMonto = filtrados[i].tipo == "D" ? (filtrados[i].monto * -1) : filtrados[i].monto;
        tabla += "<tr><td>" + filtrados[i].numeroCuenta + "</td>" +
                 "<td>" + displayMonto.toFixed(2) + "</td>" +
                 "<td>" + (filtrados[i].tipo == "C" ? "CRÉDITO" : "DÉBITO") + "</td></tr>";
    }
    tabla += "</table>";
    document.getElementById("tablaMovimientos").innerHTML = tabla;
}
