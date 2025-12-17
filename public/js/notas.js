var notas = [];
var apellidos = [];
var contadorId = [];

var btn_cargar = document.getElementById('btn_cargar');
var tabla = document.getElementById('tabla_estudiantes');

btn_cargar.addEventListener('click', function () {

    var txt_nota = document.getElementById('txt_nota');
    var txt_apellido = document.getElementById('txt_apellido');

    var nota = Number(txt_nota.value);
    var apellido = txt_apellido.value.trim();

    if (apellido === '' || isNaN(nota) || nota < 0 || nota > 10) {
        alert('Ingrese una nota válida (0-10) y un apellido');
        return;
    }

    notas.push(nota);
    apellidos.push(apellido);
    contadorId.push(contadorId.length + 1);

    txt_nota.value = '';
    txt_apellido.value = '';

    mostrarTabla();
    calcularResultados();
});

function eliminarEstudiante(posicion) {
    notas.splice(posicion, 1);
    apellidos.splice(posicion, 1);
    contadorId.splice(posicion, 1);

    mostrarTabla();
    calcularResultados();
}

function mostrarTabla() {
    tabla.innerHTML = '';

    notas.forEach(function (nota, posicion) {

        var tr = document.createElement('tr');

        var td_id = document.createElement('td');
        td_id.textContent = contadorId[posicion];

        var td_nota = document.createElement('td');
        td_nota.textContent = nota;

        var td_apellido = document.createElement('td');
        td_apellido.textContent = apellidos[posicion];

        var td_accion = document.createElement('td');

        var btn_eliminar = document.createElement('button');
        btn_eliminar.textContent = 'Eliminar';
        btn_eliminar.classList.add('btn', 'btn-sm', 'btn-danger');

        btn_eliminar.addEventListener('click', function () {
            eliminarEstudiante(posicion);
        });

        td_accion.appendChild(btn_eliminar);

        tr.appendChild(td_id);
        tr.appendChild(td_nota);
        tr.appendChild(td_apellido);
        tr.appendChild(td_accion);

        tabla.appendChild(tr);
    });
}

function calcularResultados() {
    var aprobados = 0;
    var supletorios = 0;
    var reprobados = 0;
    var suma = 0;

    notas.forEach(function (nota) {
        suma += nota;

        if (nota >= 7) {
            aprobados++;
        } else if (nota >= 5) {
            supletorios++;
        } else {
            reprobados++;
        }
    });

    var promedio = notas.length > 0 ? (suma / notas.length) : 0;
    var estado = promedio >= 7 ? 'CURSO APROBADO ✅' : 'CURSO EN RIESGO ⚠️';

    document.getElementById('total_aprobados').textContent = aprobados;
    document.getElementById('total_supletorios').textContent = supletorios;
    document.getElementById('total_reprobados').textContent = reprobados;
    document.getElementById('promedio_curso').textContent = promedio.toFixed(2);
    document.getElementById('estado_curso').textContent = notas.length > 0 ? estado : '---';
}

