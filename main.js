document.getElementById("calcular").addEventListener("click", () => {
  
  let fecha = document.getElementById("fecha").value;
  const empresa = document.getElementById("empresa").value;
  const sector = document.getElementById("sector").value;
  const puesto = document.getElementById("puesto").value;
  const tarea = document.getElementById("tarea").value;

  const tabla = parseInt(document.getElementById("tabla").value);
  const altura = parseInt(document.getElementById("altura").value);
  const distancia = parseInt(document.getElementById("distancia").value);
  const peso = parseFloat(document.getElementById("peso").value);


  if (!tabla || !altura || !distancia || isNaN(peso)) {
    document.getElementById("resultado").innerHTML = "<p style='color:red;'>⚠️ Por favor, complete todos los campos obligatorios: Tabla, Altura de levantamiento, Distancia horizontal del levantamiento y Peso levantado.</p>";
    return;
  }

  if (!fecha) {
    const ahora = new Date();
    fecha = ahora.toLocaleDateString("es-AR");
  }

  const textoTabla = {
    1: "Tabla 1: Realiza tareas hasta 2 horas al día y con hasta 60 levantamientos por hora, o de mas de 2 horas al día y con hasta 12 levantamientos por hora",
    2: "Tabla 2: Realiza tareas de mas de 2 horas al día y de 12 a 30 levantamientos por hora, o hasta 2 horas al día y de 60 a 360 levantamientos por hora",
    3: "Tabla 3: Realiza tareas de mas de 2 horas al día y de 30 a 360 levantamientos por hora",
  }[tabla];

  const textoAltura = {
    1: "Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo",
    2: "Desde la altura de los nudillos hasta por debajo del hombro",
    3: "Desde la mitad de la espinilla hasta la altura de los nudillos",
    4: "Desde el suelo hasta la mitad de la espinilla",
  }[altura];

  const textoDistancia = {
    1: "Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillos",
    2: "Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos",
    3: "Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos",
  }[distancia];

  const resultado = limites.find(
    (item) =>
      item.tabla === tabla &&
      item.altura === textoAltura &&
      item.distancia === textoDistancia
  );

  const divResultado = document.getElementById("resultado");

  if (!resultado) {
    divResultado.innerHTML = "<p>⚠️ No se conoce un límite seguro para levantamientos repetidos, para los datos ingresados.</p>";
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
    <p><strong>Tabla:</strong> ${textoTabla}</p>
    <p><strong>Altura:</strong> ${textoAltura}</p>
    <p><strong>Distancia:</strong> ${textoDistancia}</p>
    <p><strong>Peso levantado:</strong> ${peso} kg</p>
    <p><strong>Límite:</strong> ${resultado.limite} kg</p>
    <p style="color:${admisible ? 'green' : 'red'};">
      <strong>${admisible ? '✅ La carga es admisible, para la altura y distancia de levantamiento ingresados.' : '❌ La carga NO es admisible para la altura y distancia de levantamiento ingresados.'} para la altura y distancia seleccionadas.</strong>
    </p>`;


  const evaluaciones = JSON.parse(localStorage.getItem("evaluaciones")) || [];
  evaluaciones.push({
    empresa, sector, puesto, tarea, fecha,
    tabla, altura: textoAltura, distancia: textoDistancia,
    peso, limite: resultado.limite, admisible
  });
  localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
});


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
  document.getElementById("resultado").innerHTML = "";
});
