const   contSelect  = document.querySelector("#cont-selector");
const   contTareas  = document.querySelector("#cont-tareas");
const   contEncont  = document.querySelector("#cont-encontrado");

const ingresoTarea  = document.querySelector("#in-tarea");
const ingresoBusca  = document.querySelector("#in-buscar");
const inTarActualiz = document.querySelector("#in-tarea-act");
const inNuevoTexto  = document.querySelector("#nue-texto");
const inTarEliminar = document.querySelector("#in-eliminar");

const listaTareas   = document.querySelector("#lista-tareas");
const listaDeEncont = document.querySelector("#lista-encontrada");

// Inicializar la variable
var   listaDeTareas = [];
// Verificar si ya existe en localStorage
if (localStorage.getItem("listaDeTareas")) {
  // Recupero el valor de la variable desde localStorage
  listaDeTareas = JSON.parse(localStorage.getItem('listaDeTareas'));
} else {
  // Si la variable no existe en localStorage, la guardo
  localStorage.setItem('listaDeTareas', JSON.stringify(listaDeTareas));
}
var  entEncontrad  = [];


let nuevaTarea      = "";
let buscaEnTarea    = "";
let tarActualizar   = 0;
let textoActualizar = "";
let tarEliminar     = 0;

listaTareas.innerHTML = "";
ingresoTarea.value  = "Nueva Tarea";
ingresoBusca.value  = "Buscar";
inTarActualiz.value = "Nro. Tarea Actualizar"
inNuevoTexto.value  = "Nuevo Texto";
inTarEliminar.value = "Nro. Tarea Eliminar";

contEncont.style.display = "none"; 

// INICIALIZACIÓN LISTA DE TAREAS
muestraLista();
actListaDeTareas();

/* F U N C I O N E S */

// guarda lista de tareas en localStorage
function guardaListaTareas() {
    localStorage.setItem('listaDeTareas', JSON.stringify(listaDeTareas));
}
// recupera lista de tareas en localStorage
function recuperaListaTareas() {
    listaDeTareas = JSON.parse(localStorage.getItem('listaDeTareas'));
}

// Manejo de Visualización de Listas de Tareas y Encontrado
function muestraLista () {
    contEncont.style.display = "none"; 
    contTareas.style.display = "block"; 
} 
function muestraEncontrado () {
    contTareas.style.display = "none"; 
    contEncont.style.display = "block";
} 

// Actualiza Lista de Tareas
function actListaDeTareas() {
    listaTareas.innerHTML = "";
    for (let idx=0; idx < listaDeTareas.length ; idx++) {
        listaTareas.innerHTML += `<li>${listaDeTareas[idx]}</li>`;
    }
};

// Carga Lista de encontrados
function cargaListEncontrado () {
    listaDeEncont.innerHTML = "";
    for (let idx=0; idx < entEncontrad.length ; idx++) {
        listaDeEncont.innerHTML += `<li>${entEncontrad[idx]}</li>`;
    }
};

// AGREGA NUEVA TAREA
function clkNueTarea() {
    muestraLista();
    if (ingresoTarea.value == "") {
        ingresoTarea.value  = "Nueva Tarea";
    } else {ingresoTarea.value = "";}
}

function agregaTarea() {
    nuevaTarea = ingresoTarea.value;
    ingresoTarea.value = "Nueva Tarea"; 
    listaDeTareas.push(nuevaTarea);
    guardaListaTareas();
    actListaDeTareas();
}

// BUSCAR TAREA
function clkEnBuscar() {
    if (ingresoBusca.value == "") {
        ingresoBusca.value  = "Buscar";
    } else {ingresoBusca.value = "";}
}

function buscarTarea() {
    buscaEnTarea = ingresoBusca.value;
    entEncontrad.length = 0;
    for (let i = 0; i < listaDeTareas.length; i++) {
        if (listaDeTareas[i].includes(buscaEnTarea)) {
          entEncontrad.push("Nro:"+(i+1)+"_ "+(listaDeTareas[i]));
        }
      }   
      if (entEncontrad.length > 0) {
            muestraEncontrado ();
            cargaListEncontrado ();
            ingresoBusca.value = "Buscar";
      } else {
        ingresoBusca.value = `No se encontró "${buscaEnTarea}".`;
      }
 }

// ACTUALIZAR TEXTO TAREA
function clkActTarea() {
    muestraLista();
    if (inTarActualiz.value == "") {
        inTarActualiz.value = "Nro. Tarea Actualizar";
    } else {inTarActualiz.value = "";}
}

function clkNueTexto() {
    muestraLista();
    if (inNuevoTexto.value == "") {
        inNuevoTexto.value  = "Nuevo Texto";
    } else {inNuevoTexto.value  = "";}
}
function actualizTarea() {
    if ((tarActualizar = parseInt(inTarActualiz.value))>0){
        textoActualizar = inNuevoTexto.value;
        listaDeTareas[tarActualizar-1] = textoActualizar;
        guardaListaTareas();
        actListaDeTareas();
        inTarActualiz.value = "Nro. Tarea Actualizar";
        inNuevoTexto.value  = "Nuevo Texto";
    } 
    else {
        inTarActualiz.value = "Nro. debe ser Mayor que 0";
    }
}

// ELIMINAR TAREA
function clkEnEliminar() {
    muestraLista();
    if (inTarEliminar.value == "") {
        inTarEliminar.value = "Nro. Tarea Eliminar";
    } else {inTarEliminar.value = "";}    
}
function eliminarTarea() {
    if ((tarEliminar = parseInt(inTarEliminar.value))>0){
        listaDeTareas.splice(tarEliminar-1, 1);
        guardaListaTareas();
        actListaDeTareas();
        inTarEliminar.value = "Nro. Tarea Eliminar";
    } 
    else {
        inTarEliminar.value = "Nro. debe ser Mayor que 0";
    }
    
}



