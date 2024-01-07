const botonCrearTarea = document.getElementById('btn-crear');
const contenedorGeneral = document.querySelector('.contenedor');
const contenedorTareas = document.getElementById('contenedor-tareas');

const crearTarea = (evento) => {
    evento.preventDefault();
    contenedorGeneral.style.paddingTop = '50px';
    
    const inputTarea = document.getElementById('input-tarea');
    const tareaIngresada = inputTarea.value;

    if(tareaIngresada === '') {
        alert('El campo NO puede estar vacío.')
        return;
    }
    
    const nuevaTarea = document.createElement('div'); // Creo el DIV para la Tarea
    nuevaTarea.classList.add('tarea', 'tarea-incompleta'); // Agrego la Clase "tarea" y "tarea-incompleta" al Nuevo Elemento
    //Le inserto Código HTML al Nuevo Elemento
    nuevaTarea.innerHTML = `
        <p class="texto-tarea">${tareaIngresada}</p>
        <p class="blanco"></p>
        <i class="bi bi-check-circle-fill icono check check-incompleto"></i>
        <i class="bi bi-trash3-fill icono trash"></i>
    `
    contenedorTareas.append(nuevaTarea); //Agrego el DIV creado al DOM

    const check = document.querySelectorAll('.check'); // Esto me trae del DOM a TODOS los Elementos con .check
    const trash = document.querySelectorAll('.trash');

    //El primer .check que haya, será el último a la vez, por lo que también tendrá el EVENTO
    const ultimoCheck = check[check.length-1]; // Obtengo al último .check de todos los .check
    const ultimoTrash = trash[trash.length-1]; // Obtengo al último .trash de todos los .trash

    ultimoCheck.addEventListener('click', marcarTareaCompletada); //Agrego el Evento siempre al último .check
    ultimoTrash.addEventListener('click', eliminarTarea); //Agrego el Evento siempre al último .trash

    contenedorTareas.style.display = 'block';
}

const marcarTareaCompletada = (evento) => {
    const checkSeleccionado = evento.target;
    const tareaSeleccionada = checkSeleccionado.parentElement;

    if(checkSeleccionado.classList.contains('check-completo')) { 
        checkSeleccionado.classList.remove('check-completo');
        checkSeleccionado.classList.add('check-incompleto');
        tareaSeleccionada.classList.remove('tarea-completa');
        tareaSeleccionada.classList.add('tarea-incompleta');
    } else {    //Siempre que no exista la Clase "completa", existirá la Clase "incompleta"
        checkSeleccionado.classList.remove('check-incompleto');
        checkSeleccionado.classList.add('check-completo');
        tareaSeleccionada.classList.remove('tarea-incompleta');
        tareaSeleccionada.classList.add('tarea-completa');
    }
}

const eliminarTarea = (evento) => {
    const trashSeleccionado = evento.target;
    console.log(trashSeleccionado)
    const tareaSeleccionada = trashSeleccionado.parentElement;
    tareaSeleccionada.remove();
}

botonCrearTarea.addEventListener('click', crearTarea);