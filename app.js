const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla');
let arrayPersona = JSON.parse(localStorage.getItem('item')) ?? [];
let id = 0;

mostarDatos();
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    capturarDatos();
    mostarDatos();
})

function capturarDatos() {
    const nombre = document.getElementById('nombres').value;
    const apellido = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;
    validarDatos(nombre, apellido, edad);
    localStorage.setItem('item', JSON.stringify(arrayPersona))

}

function validarDatos(nombre, apellido, edad) {
    let ExpRegLetrasEspacio = "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
    let ExpRegSoloNumeros = /^-{0,1}\d*\.{0,1}\d+$/;


    if (nombre.length == 0 || apellido.length == 0) {
        alert('El campo: nombre, apellido, edad no pueden ser vacios')
        return
    }

    if (nombre.match(ExpRegLetrasEspacio) != null &&
        apellido.match(ExpRegLetrasEspacio) != null &&
        edad.match(ExpRegSoloNumeros) != null) {
        id++
        let newPersona = {
            id: id,
            nombres: nombre,
            apellidos: apellido,
            edad: edad
        }

        arrayPersona.push(newPersona);
    }
}

function mostarDatos() {
    let contendedor = '';
    arrayPersona.forEach(element => {
        contendedor += `
        <tr>
            <th scope="row">${element.id}</th>
            <td>${element.nombres}</td>
            <td>${element.apellidos}</td>
            <td>${element.edad}</td>
            <td><button onclick="" class="btn btn-primary">Editar</button></td>
            <td><button onclick="eliminarPersona(${element.id})" class="btn btn-primary">Eliminar</button></td>
        </tr> 
        `;
    });
    tabla.innerHTML = contendedor;
}

function eliminarPersona(id) {
    let elimi = arrayPersona.filter((elemento) => elemento.id !== id);
    arrayPersona = elimi;
    mostarDatos();
}

const act = document.getElementById('formularioActualizar');
function EditarPersona(id) {

    let tablaAct = '';
    let edit = arrayPersona.filter((elemento) => elemento.id !== id);
    tablaAct += `
        <div class="mb-3">
            <label for="nombre" class="form-label">Nombres</label>
            <input type="text" class="form-control" id="nombre" >
        </div>
        <div class="mb-3">
            <label for="apellido" class="form-label">Apellidos</label>
            <input type="text" class="form-control" id="apellido">
        </div>
        <div class="mb-3">
            <label for="edad2" class="form-label">Edad</label>
            <input type="text" class="form-control" id="edad2">
        </div>
        <button onclick="actualizarPersona(${id})" class="btn btn-primary">Actualizar</button>
    `;
    act.innerHTML = tablaAct;

}

function actualizarPersona(id){
    const nomb = document.getElementById('nombre').value;
    const apel = document.getElementById('apellido').value;
    const edad = document.getElementById('edad2').value;
    
    let edit = arrayPersona.filter((elemento) => elemento.id !== id);
    
    edit.nombres = nomb;
    edit.apellidos = apel;
    edit.edad = edad; 
}
