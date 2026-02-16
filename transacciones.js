cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");

    document.getElementById("btnDepositar").disabled = true;
    document.getElementById("btnRetirar").disabled = true;
    
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta=function(numeroCuenta){
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i];
        }
    }
    return null;

}

ejecutarBusqueda=function(){ 
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert

    let numCuenta = document.getElementById("txtBusquedaCuenta").value;
    let cuenta = buscarCuenta(numCuenta);
    if (cuenta != null) {
        document.getElementById("lblNombre").innerHTML = cuenta.nombre + " " + cuenta.apellido;
        document.getElementById("lblSaldo").innerHTML = cuenta.saldo;
        document.getElementById("btnDepositar").disabled = false;
        document.getElementById("btnRetirar").disabled = false;
    } else {
        alert("CUENTA INEXISTENTE");
        document.getElementById("btnDepositar").disabled = true;
        document.getElementById("btnRetirar").disabled = true;
    }

} 

depositar=function(numeroCuenta,monto){
    let cuentaAfectada = buscarCuenta(numeroCuenta);
    if (cuentaAfectada != null) {
        cuentaAfectada.saldo += parseFloat(monto);
    }
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
}

ejecutarDeposito=function(){
    //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta
    let numCuenta = document.getElementById("txtBusquedaCuenta").value;
    let monto = document.getElementById("txtMonto").value;
    depositar(numCuenta, monto);
    alert("TRANSACCION EXITOSA");
    let cuenta = buscarCuenta(numCuenta);
    document.getElementById("lblSaldo").innerHTML = cuenta.saldo;
}


retirar=function(numeroCuenta,monto){
      //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta

    let cuentaAfectada = buscarCuenta(numeroCuenta);
    let valorMonto = parseFloat(monto);
    if (cuentaAfectada.saldo >= valorMonto) {
        cuentaAfectada.saldo -= valorMonto;
        alert("TRANSACCION EXITOSA");
        document.getElementById("lblSaldo").innerHTML = cuentaAfectada.saldo;
    } else {
        alert("SALDO INSUFICIENTE");
    }
  }