let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
cantidad.innerText = `🛒${carrito.length}`;

if (carrito.length != 0) {
    for (const curs of carrito) {
        //agregar tabla de carrito
        document.getElementById('tablabody').innerHTML += `
            <tr>
                <td>${curs.nombre}</td>
                <td>${curs.duracion}</td>
                <td>${curs.precio}</td>
            </tr>
        `;
    }
    //sumar el total
    let totalCarrito = carrito.reduce((acumulador, curso) => acumulador + curso.precio, 0);
    document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;
}

// funcion para obtener los cursos y renderizarlos en el dom
function obtenerCursos(){
    const URL = "/cursos.json";
    fetch(URL)
    .then( respuesta => respuesta.json())
    .then ( cursos => {
        const listaCursosProgramacion = cursos.programacion;
        const listaCursosMarketing = cursos.marketing;
        const listaCursosDiseño = cursos.diseño;
        console.log(listaCursosProgramacion,listaCursosDiseño,listaCursosMarketing);

        // cards de programacion
        listaCursosProgramacion.forEach(cursopr => {
            document.getElementById("misCursosPr").innerHTML += `
        <div class="card " style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${cursopr.nombre}</h5>
                <p class="card-text">${cursopr.texto}</p>
                <p class="card-text">$${cursopr.precio}</p>
                <button id='btn${cursopr.id}' class="btn align-bottom" style="background: rgb(104, 45, 198); color: white">Agregar al carrito</button>
            </div>
        </div>
        `;
        });
        listaCursosProgramacion.forEach((cursopr) => {
            document.getElementById(`btn${cursopr.id}`).addEventListener('click', () => {
                agregarACarrito(cursopr);
            });
        });

        // cards de marketing
        listaCursosMarketing.forEach(cursomk => {
            document.getElementById("misCursosMk").innerHTML += `
        <div class="card" style="width: 18rem; background: rgb(104, 45, 198); color: white;">
            <div class="card-body">
                <h5 class="card-title">${cursomk.nombre}</h5>
                <p class="card-text">${cursomk.texto}</p>
                <p class="card-text">$${cursomk.precio}</p>
                <button id='btn${cursomk.id}' class="btn align-bottom" style="background: white; color: rgb(104, 45, 198)">Agregar al carrito</button>
            </div>
        </div>
        `;
        });
        listaCursosMarketing.forEach((cursomk) => {
            document.getElementById(`btn${cursomk.id}`).addEventListener('click', () => {
                agregarACarrito(cursomk);
            });
        });

        // cards de diseño
        listaCursosDiseño.forEach(cursods => {
            document.getElementById("misCursosDs").innerHTML += `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${cursods.nombre}</h5>
                <p class="card-text">${cursods.texto}</p>
                <p class="card-text">$${cursods.precio}</p>
                <button id='btn${cursods.id}' class="btn align-bottom" style="background: rgb(104, 45, 198); color: white">Agregar al carrito</button>
            </div>
        </div>
        `;
        });
        listaCursosDiseño.forEach((cursods) => {
            document.getElementById(`btn${cursods.id}`).addEventListener('click', () => {
                agregarACarrito(cursods);
            });
        });
    })
}

obtenerCursos();

function agregarACarrito(cursoAAgregar) {
    carrito.push(cursoAAgregar);
    cantidad.innerText = `🛒${carrito.length}`;
    console.table(carrito);

    //agregar fila a la tabla de carrito
    document.getElementById('tablabody').innerHTML += `
        <tr>
            <td>${cursoAAgregar.nombre}</td>
            <td>${cursoAAgregar.duracion}</td>
            <td>$${cursoAAgregar.precio}</td>
        </tr>
    `;
    //sumar el total
    let totalCarrito = carrito.reduce((acumulador, curso) => acumulador + curso.precio, 0);
    document.getElementById('total').innerText = 'Total a pagar $: ' + totalCarrito;
    //localstorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


let finalizarBtn = document.getElementById('finalizar');

// vaciar el carrito
finalizarBtn.onclick = () => {
    carrito = [];
    document.getElementById('tablabody').innerHTML = ''
    cantidad.innerText = `🛒${carrito.length}`;
    document.getElementById('total').innerText = 'Total a pagar $: ';
    localStorage.removeItem('carrito');

    Toastify({
        text: "Finalizaste la compra, te mandaremos un correo para seguir con el pago",
        duration: 5000,
        gravity: 'bottom',
        position: 'right'
    }).showToast();

}