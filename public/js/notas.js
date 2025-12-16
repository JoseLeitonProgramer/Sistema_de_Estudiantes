let estudiantes = [];
let contadorId = 1;

const tabla = document.getElementById("tabla_estudiantes");
const btnCargar = document.getElementById("btn_cargar");

btnCargar.addEventListener("click", () => {
    let nota = Number(document.getElementById("txt_nota").value);
    let apellido = document.getElementById("txt_apellido").value.trim();

    if (apellido === "" || isNaN(nota) || nota < 0 || nota > 10) {
        alert("Ingrese una nota válida (0-10) y un apellido.");
        return;
    }

    estudiantes.push({
        id: contadorId++,
        nota: nota,
        apellido: apellido
    });

    document.getElementById("txt_nota").value = "";
    document.getElementById("txt_apellido").value = "";

    renderTabla();
    calcularResultados();
});

function renderTabla() {
    tabla.innerHTML = "";

    estudiantes.forEach(est => {
        tabla.innerHTML += `
            <tr>
                <td>${est.id}</td>
                <td>${est.nota}</td>
                <td>${est.apellido}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminar(${est.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function eliminar(id) {
    estudiantes = estudiantes.filter(e => e.id !== id);
    renderTabla();
    calcularResultados();
}

function calcularResultados() {
    let aprobados = 0, supletorios = 0, reprobados = 0, suma = 0;

    estudiantes.forEach(e => {
        suma += e.nota;

        if (e.nota >= 7) aprobados++;
        else if (e.nota >= 5) supletorios++;
        else reprobados++;
    });

    let promedio = estudiantes.length ? suma / estudiantes.length : 0;
    let estado = promedio >= 7 ? "CURSO APROBADO ✅" : "CURSO EN RIESGO ⚠️";

    document.getElementById("total_aprobados").textContent = aprobados;
    document.getElementById("total_supletorios").textContent = supletorios;
    document.getElementById("total_reprobados").textContent = reprobados;
    document.getElementById("promedio_curso").textContent = promedio.toFixed(2);
    document.getElementById("estado_curso").textContent = estudiantes.length ? estado : "---";
}
