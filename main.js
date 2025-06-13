const textoTabla = {
  1: "Tabla 1: Realiza tareas hasta 2 horas al día y con hasta 60 levantamientos por hora, o de mas de 2 horas al día y con hasta 12 levantamientos por hora",
  2: "Tabla 2: Realiza tareas de mas de 2 horas al día y de 12 a 30 levantamientos por hora, o hasta 2 horas al día y de 60 a 360 levantamientos por hora",
  3: "Tabla 3: Realiza tareas de mas de 2 horas al día y de 30 a 360 levantamientos por hora",
};

const textoAltura = {
  1: "Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo",
  2: "Desde la altura de los nudillos hasta por debajo del hombro",
  3: "Desde la mitad de la espinilla hasta la altura de los nudillos",
  4: "Desde el suelo hasta la mitad de la espinilla",
};

const textoDistancia = {
  1: "Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillos",
  2: "Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos",
  3: "Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos",
};

const divResultado = document.getElementById("resultado");
divResultado.style.display = "none"; //oculta el cuadro de resultado al cargar la página

let limites = [];

fetch("../data/limites.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    limites = data;
    console.log("Limites cargados:", limites);
  })

  .catch((error) => {
    console.error("Error al cargar los límites:", error);
    Toastify({
      text: "⚠️ Error al cargar los límites de levantamiento.",
      duration: 5000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e74c3c",
      stopOnFocus: true,
    }).showToast();
  });


// Evento: clic en botón calcular
document.getElementById("calcular").addEventListener("click", () => {
  let fechaInput = document.getElementById("fecha").value;
  let fecha = "";

  if (!fechaInput) {
    const ahora = new Date();
    fecha = ahora.toLocaleDateString("es-AR");
  } else {
    const partes = fechaInput.split("-");
    const año = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    fecha = `${dia}/${mes}/${año}`;
  }
  const empresa = document.getElementById("empresa").value;
  const sector = document.getElementById("sector").value;
  const puesto = document.getElementById("puesto").value;
  const tarea = document.getElementById("tarea").value;

  const tabla = parseInt(document.getElementById("tabla").value);
  const altura = parseInt(document.getElementById("altura").value);
  const distancia = parseInt(document.getElementById("distancia").value);
  const peso = parseFloat(document.getElementById("peso").value);

if (!tabla || !altura || !distancia || isNaN(peso)) {
  Swal.fire({
    icon: "warning",
    title: "Campos incompletos",
    text: "Por favor, completá todos los campos obligatorios",
    confirmButtonText: "Cerrar"
  });
  return;
}

  const alturaTexto = textoAltura[altura];
  const distanciaTexto = textoDistancia[distancia];
  const tablaTexto = textoTabla[tabla];

  const resultado = limites.find(
    (item) =>
      item.tabla === tabla &&
      item.altura === alturaTexto &&
      item.distancia === distanciaTexto
  );

  if (!resultado) {
    divResultado.innerHTML =
      "<p>⚠️ No se conoce un límite seguro para levantamientos repetidos, para los datos ingresados.</p>";
    divResultado.classList.add("resultado-lmc");
    divResultado.style.display = "block";
    return;
  }

  const admisible = peso <= resultado.limite;

  divResultado.innerHTML = `
    <h2>Resultado de la Evaluación</h2>
    <p><strong>Empresa:</strong> ${empresa}</p>
    <p><strong>Área / Sector:</strong> ${sector}</p>
    <p><strong>Puesto:</strong> ${puesto}</p>
    <p><strong>Tarea:</strong> ${tarea}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Tabla:</strong> ${tablaTexto}</p>
    <p><strong>Altura:</strong> ${alturaTexto}</p>
    <p><strong>Distancia:</strong> ${distanciaTexto}</p>
    <p><strong>Peso levantado:</strong> ${peso} kg</p>
    <p><strong>Límite:</strong> ${resultado.limite} kg</p>
    <p style="color:${admisible ? "green" : "red"};">
      <strong>${
        admisible
          ? "✅ La carga es admisible, para la altura y distancia de levantamiento ingresados."
          : "❌ La carga NO es admisible para la altura y distancia de levantamiento ingresados."
      }</strong>
    </p>`;
  divResultado.classList.add("resultado-lmc");
  divResultado.style.display = "block";

  // Guardar evaluación en localStorage
  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  evaluaciones.push({
    empresa,
    sector,
    puesto,
    tarea,
    fecha,
    tabla: tablaTexto,
    altura: alturaTexto,
    distancia: distanciaTexto,
    peso,
    limite: resultado.limite,
    admisible,
  });
  localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
});

// Botón limpiar campos
document.getElementById("limpiar").addEventListener("click", () => {
  document.getElementById("empresa").value = "";
  document.getElementById("sector").value = "";
  document.getElementById("puesto").value = "";
  document.getElementById("tarea").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("tabla").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("distancia").value = "";
  document.getElementById("peso").value = "";
  const divResultado = document.getElementById("resultado");
  divResultado.innerHTML = "";
  divResultado.classList.remove("resultado-lmc");
  divResultado.style.display = "none";
});
