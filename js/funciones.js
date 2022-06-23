const close = () => {
    window.location.href = "../";
}
const limpiarAlerta = (elemento) => { //esta funcion sirve para limpiar la alerta a medida de que se valida con cada click 
    let alerta = document.querySelector(elemento); //div el contenedor de la alerta
    let mensejeHtml = document.querySelector("#mensaje"); //div html de la alerta contenedor
    if (Boolean(mensejeHtml)) { //valida si existe la alerta
        alerta.classList.add("alerta-oculta"); //oculta la alerta removiendo la clase css
        alerta.removeChild(mensejeHtml); //elimina el div con el contenido de la alerta
    }
}
const alertaExito = (texto) => {
    Swal.fire({ //alerta de libreria sweetalert2
        position: 'center',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1900
    })
    setTimeout(function() { //despues de 2 seg ejecurar la redirección
        window.location.href = "../";
    }, 2000);
}
const validarAgendaContacto = () => {
    const nombre = document.querySelector("#nombreAgendaContacto");
    const telefono = document.querySelector("#telefonoAgendaContacto");
    const correo = document.querySelector("#correoAgendaContacto");
    //Expresiones regulares de email y numero
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let numeroRegex = /^[0-9]*(\.?)[ 0-9]+$/;

    limpiarAlerta("#alerta"); //llamada a limpia la alerta
    let mensaje = "";
    if (!nombre.value) {
        mensaje += "El campo nombre esta vacio";
        nombre.focus();
    } else if (!telefono.value) {
        mensaje += "El campo teléfono esta vacio";
        telefono.focus();
    } else if (!numeroRegex.test(telefono.value)) { //evalua si es tipo numerico
        mensaje += "El campo teléfono es númerico";
        telefono.focus();
    } else if (correo.value) {
        if ((!emailRegex.test(correo.value))) { //evalua el email si cumple con la expresión
            mensaje += "El campo email no es correcto";
            correo.focus();
        }

    }
    return mensaje;
}
const alertaFormularioAgenda = (elemento, contenido) => {
    const alerta = document.querySelector(elemento); //html de la alerta
    let mensaje = document.createElement("div"); //div del contenido de la alerta
    mensaje.setAttribute('id', 'mensaje'); //añadimos id al div contenido alerta
    mensaje.innerHTML = contenido; //agregamos el mensaje al div
    alerta.appendChild(mensaje); //adicionamos al padre el div html
    alerta.classList.remove("alerta-oculta"); //removemos la clase css para mostrar la alerta
}

const guardarEnLocalStorage = (dataBase, contactoData, mensaje) => {
    let clave = Math.random(1, 100); //identificador para el localStorage
    contactoData.id = clave;
    let convertirJson = JSON.stringify(contactoData);
    dataBase.setItem(clave, convertirJson);
    alertaExito(mensaje);
}
const listarContactosAgenda = (parentNode, contacto, baseData) => {
    //parametros parentNode el contenedor padre de todos los datos, contacto el registro, daseData el localStorage para eliminar registro
    /* Creación de elementos HTML */
    const divCol = document.createElement("div");
    const divCard = document.createElement("div");
    const divCardHeader = document.createElement("div");
    const h5Titulo = document.createElement("h5");
    const iconoDetele = document.createElement("i");
    const divCardBody = document.createElement("div");
    const htmlNombre = document.createElement("p");
    const htmltelefono = document.createElement("p");
    const htmlEmail = document.createElement("p");
    //Inicializar datos en html
    htmlNombre.innerHTML = `Nombre: ${contacto.nombre}`;
    htmltelefono.innerHTML = `Teléfono ${contacto.numero}`;
    htmlEmail.innerHTML = `Email: ${contacto.correo}`;
    h5Titulo.innerHTML = contacto.tipoAgenda.toUpperCase();
    //agregar clases css a los elementos html
    divCol.classList.add("col-2", "col-md-4");
    divCard.classList.add("card");
    divCardHeader.classList.add("card-header", "header-item");
    h5Titulo.classList.add("card-title");
    iconoDetele.classList.add("fas", "fa-1x", "fa-trash-alt", "icono-delete");
    divCardBody.classList.add("card-body");
    htmlNombre.classList.add("card-text", "space");
    htmltelefono.classList.add("card-text", "space");
    htmlEmail.classList.add("card-text", "space");

    iconoDetele.addEventListener('click', () => {
        baseData.removeItem(contacto.id);
        alertaExito("Contacto Eliminado");
    })

    //agregar html a los padres
    divCardHeader.appendChild(h5Titulo);
    divCardHeader.appendChild(iconoDetele);
    divCardBody.appendChild(htmlNombre);
    divCardBody.appendChild(htmltelefono);
    divCardBody.appendChild(htmlEmail);
    divCard.appendChild(divCardHeader);
    divCard.appendChild(divCardBody);
    divCol.appendChild(divCard)
    parentNode.appendChild(divCol); //adicionar al contenedor padres

}

const cargarContactosAgenda = (parentNode, baseDatos) => {
    // recibe el contenedor padre, y la base de datos la cual es el localStorage
    let claves = Object.keys(baseDatos); //Obtiene una array de claves del localStorage
    claves.forEach(clave => { //recorre el array
        let contactoAgenda = baseDatos.getItem(clave); //se obtine el valor del registro del local Storage segun la clave
        contactoAgenda = JSON.parse(contactoAgenda); //convierte el registro en JSON (objeto)
        if (contactoAgenda.tipoAgenda === "contacto") { //valida si es un contacto
            listarContactosAgenda(parentNode, contactoAgenda, baseDatos); //funcion listar Datos de contacto
        }
    });
}


//NOTA
const validarAgendaNota = () => {
        const tituloNota = document.querySelector("#tituloNota");
        const contenidoNota = document.querySelector("#contenidoNota");
        limpiarAlerta("#alertaNota");
        let mensaje = "";
        if (!tituloNota.value) {
            mensaje += "El campo Titulo esta vacio";
            tituloNota.focus();
        } else if (!contenidoNota.value) {
            mensaje += "EL campo del contenido de la nota esta vacio";
            contenidoNota.focus();
        }
        return mensaje;
    }
    //TAREA
const validarAgendaTarea = () => {
    const tituloTarea = document.querySelector("#tituloTarea");
    const contenidoTarea = document.querySelector("#contenidoTarea");
    const fechaTarea = document.querySelector("#fechaTarea");
    const horaTarea = document.querySelector("#horaTarea");
    limpiarAlerta("#alertaTarea");
    let mensaje = "";
    if (!tituloTarea.value) {
        mensaje += "EL campo Titulo está Vacio";
        tituloTarea.focus();
    } else if (!contenidoTarea.value) {
        mensaje += "EL campo Contenido está Vacio";
        contenidoTarea.focus();
    } else if (!fechaTarea.value) {
        mensaje += "No has selecionado la fecha";
        fechaTarea.focus();
    } else if (!horaTarea.value) {
        mensaje += "No has designado una hora a la Tarea";
        horaTarea.focus();
    }
    return mensaje;
}
const validarAgendaEvento = () => {
    const tituloEvento = document.querySelector("#tituloEvento");
    const contenidoEvento = document.querySelector("#contenidoEvento");
    const fechaEventoInicio = document.querySelector("#fechaEventoInicio");
    const horaEventoInicio = document.querySelector("#horaEventoInicio");
    const fechaEventoFinal = document.querySelector("#fechaEventoFinal");
    const horaEventoFinal = document.querySelector("#horaEventoFinal");
    limpiarAlerta("#alertaEvento");
    let mensaje = "";
    if (!tituloEvento.value) {
        mensaje += "EL campo Titulo está Vacio";
        tituloEvento.focus();
    } else if (!contenidoEvento.value) {
        mensaje += "EL campo Contenido está Vacio";
        contenidoEvento.focus();
    } else if (!fechaEventoInicio.value) {
        mensaje += "No has selecionado la fecha de inicio del evento";
        fechaEventoInicio.focus();
    } else if (!horaEventoInicio.value) {
        mensaje += "No has designado la hora de inicio del evento";
        horaEventoInicio.focus();
    } else if (!fechaEventoFinal.value) {
        mensaje += "No has designado la fecha final del evento";
        fechaEventoFinal.focus();
    } else if (!horaEventoFinal.value) {
        mensaje += "No has designado la hora final del evento";
        horaEventoFinal.focus();
    }
    return mensaje;

}
export { close, validarAgendaContacto, alertaFormularioAgenda, guardarEnLocalStorage, cargarContactosAgenda, validarAgendaNota, validarAgendaTarea, validarAgendaEvento }