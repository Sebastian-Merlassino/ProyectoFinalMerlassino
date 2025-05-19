// Levantamiento manual de cargas según Res. 295/03
function iniciarEvaluacion() {
  
  // Preguntas al usuario

  // Tabla de levantamiento

  let tabla;
  do {
    tabla = prompt(
      "Seleccione la duración y frecuencia de los levantamientos (solo 1, 2 ó 3):\n1️⃣​ Realiza tareas hasta 2 horas al día y con hasta 60 levantamientos por hora, o de mas de 2 horas al día y con hasta 12 levantamientos por hora\n2️⃣ Realiza tareas de mas de 2 horas al día y de 12 a 30 levantamientos por hora, o hasta 2 horas al día y de 60 a 360 levantamientos por hora\n3️⃣ Realiza tareas de mas de 2 horas al día y de 30 a 360 levantamientos por hora"
    );
    if (tabla === null) {
      alert("❗Evaluación cancelada por el usuario.");
      return;
    }
    tabla = parseInt(tabla);
  } while (isNaN(tabla) || tabla < 1 || tabla > 3);

  //Altura del levantamiento

  let altura;
  do {
    altura = prompt(
      "Seleccione la altura del levantamiento (solo 1, 2, 3 ó 4):\n1️⃣ Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo\n2️⃣ Desde la altura de los nudillos hasta por debajo del hombro\n3️⃣ Desde la mitad de la espinilla hasta la altura de los nudillos\n4️⃣ Desde el suelo hasta la mitad de la espinilla"
    );
    if (altura === null) {
      alert("❗Evaluación cancelada por el usuario.");
      return;
    }
    altura = parseInt(altura);
  } while (isNaN(altura) || altura < 1 || altura > 4);

  let textoAltura = {
    1: "Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo",
    2: "Desde la altura de los nudillos hasta por debajo del hombro",
    3: "Desde la mitad de la espinilla hasta la altura de los nudillos",
    4: "Desde el suelo hasta la mitad de la espinilla",
  }[altura];

  //Distancia horizontal del levantamiento

  let distancia;
  do {
    distancia = prompt(
      "Seleccione la distancia horizontal del levantamiento (solo 1, 2 ó 3):\n1️⃣ Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillos\n2️⃣ Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos\n3️⃣ Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos"
    );
    if (distancia === null) {
      alert("❗Evaluación cancelada por el usuario.");
      return;
    }
    distancia = parseInt(distancia);
  } while (isNaN(distancia) || distancia < 1 || distancia > 3);

  let textoDistancia = {
    1: "Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillos",
    2: "Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos",
    3: "Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos",
  }[distancia];

  // Peso levantado

  let peso;
  do {
    peso = parseFloat(prompt("Ingrese el peso levantado (en Kg)"));
    if (peso === null) {
      alert("❗Evaluación cancelada por el usuario.");
      return;
    }
    peso = parseFloat(peso);
  } while (isNaN(peso) || peso < 0);

  //Búsqueda de resultados

  let resultado = limites.find(
    (item) =>
      item.tabla === tabla &&
      item.altura === textoAltura &&
      item.distancia === textoDistancia
  );

  // Resultado

  if (!resultado) {
    alert(
      "⚠️ No se conoce un límite seguro para levantamientos repetidos, para los datos ingresados."
    );
  } else {
    if (peso <= resultado.limite) {
      alert(
        `✅ La carga es admisible, para la altura y distancia de levantamiento ingresados.\nTabla: ${resultado.tabla}\nAltura: ${resultado.altura}\nDistancia: ${resultado.distancia}\nPeso: ${peso} kg\nLímite: ${resultado.limite} kg`
      );
    } else {
      alert(
        `❌ La carga NO es admisible para la altura y distancia de levantamiento ingresados.\nTabla: ${resultado.tabla}\nAltura: ${resultado.altura}\nDistancia: ${resultado.distancia}\nPeso: ${peso} kg\nLímite: ${resultado.limite} kg`
      );
    }
    console.log({
      Tabla: tabla,
      Altura: textoAltura,
      Distancia: textoDistancia,
      Peso: peso,
      Límite: resultado.limite,
    });
  }
}
