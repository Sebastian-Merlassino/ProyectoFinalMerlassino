// contenedor de resultados
const divResultado = document.getElementById("resultado");
divResultado.style.display = "none";

let limites = [];
let textoTabla = {},
  textoAltura = {},
  textoDistancia = {};

// Cargar los límites de levantamiento desde el archivo JSON
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

// Cargar referencias de tablas desde el archivo JSON
fetch("../data/referencias.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    textoTabla = data.textoTabla;
    textoAltura = data.textoAltura;
    textoDistancia = data.textoDistancia;
    console.log(
      "Referencias cargadas:",
      textoTabla,
      textoAltura,
      textoDistancia
    );
  })

  .catch((error) => {
    console.error("Error al cargar referencias:", error);
    Toastify({
      text: "⚠️ Error al cargar referencias de tablas, alturas y distancias.",
      duration: 5000,
      gravity: "top",
      position: "center",
      backgroundColor: "#e74c3c",
      stopOnFocus: true,
    }).showToast();
  });

// Evento: clic en botón para ver tablas
document.getElementById("btn-tabla1").addEventListener("click", () => {
  Swal.fire({
    title: "Tabla 1 - Resolución 295/03",
    imageUrl: "../assets/img/tabla1-res295.png",
    imageAlt: "Tabla 1",
    confirmButtonText: "Cerrar",
    width: 600,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
});

document.getElementById("btn-tabla2").addEventListener("click", () => {
  Swal.fire({
    title: "Tabla 2 - Resolución 295/03",
    imageUrl: "../assets/img/tabla2-res295.png",
    imageAlt: "Tabla 2",
    confirmButtonText: "Cerrar",
    width: 600,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
});

document.getElementById("btn-tabla3").addEventListener("click", () => {
  Swal.fire({
    title: "Tabla 3 - Resolución 295/03",
    imageUrl: "../assets/img/tabla3-res295.png",
    imageAlt: "Tabla 3",
    confirmButtonText: "Cerrar",
    width: 600,
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
});

// Evento: clic en botón Evaluar
document.getElementById("evaluar").addEventListener("click", () => {
  Toastify({
    text: "⏳ Cargando...",
    duration: 1500,
    gravity: "top",
    position: "center",
    style: {
      background: "#3498db",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "16px",
  }
  }).showToast();

  setTimeout(() => {
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
    const empresa = document.getElementById("empresa").value.trim();
    const sector = document.getElementById("sector").value.trim();
    const puesto = document.getElementById("puesto").value.trim();
    const tarea = document.getElementById("tarea").value.trim();

    const tabla = parseInt(document.getElementById("tabla").value);
    const altura = parseInt(document.getElementById("altura").value);
    const distancia = parseInt(document.getElementById("distancia").value);
    const peso = parseFloat(document.getElementById("peso").value);

    if (!tabla || !altura || !distancia || isNaN(peso) || peso < 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos o inválidos",
        text: "Por favor, completá correctamente todos los campos obligatorios (*)",
        confirmButtonText: "Cerrar",
        customClass: {
          confirmButton: "btn btn-secondary",
        },
        buttonsStyling: false,
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
    <div style="border: 2px solid grey; border-radius: 10px; background-color: white; padding: 10px; margin: 15px; text-align: center">
      <p style="color:${admisible ? "green" : "red"}; font-weight: bold;">
        ${
          admisible
            ? "✅ La carga es admisible, para la altura y distancia de levantamiento ingresados."
            : "❌ La carga NO es admisible para la altura y distancia de levantamiento ingresados."
        }
      </p>
    </div>`;
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
  }, 1500);
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

// Botón para ver historial de evaluaciones
document.getElementById("historial").addEventListener("click", () => {
  const empresa = document.getElementById("empresa").value.trim();
  const sector = document.getElementById("sector").value.trim();
  const puesto = document.getElementById("puesto").value.trim();
  const tarea = document.getElementById("tarea").value.trim();
  const fecha = document.getElementById("fecha").value.trim();
  const tabla = document.getElementById("tabla").value;
  const altura = document.getElementById("altura").value;
  const distancia = document.getElementById("distancia").value;
  const peso = document.getElementById("peso").value.trim();

  if (
    empresa ||
    sector ||
    puesto ||
    tarea ||
    fecha ||
    tabla ||
    altura ||
    distancia ||
    peso
  ) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Perderás los datos cargados en el formulario si continúas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      // confirmButtonColor: "#3085d6",
      // cancelButtonColor: "#d33",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "historial.html";
      }
    });
  } else {
    window.location.href = "historial.html";
  }
});

// Mostrar historial de evaluaciones
function mostrarHistorial() {
  const tabla = document
    .getElementById("tablaHistorial")
    ?.querySelector("tbody");
  if (!tabla) return;

  tabla.innerHTML = "";

  const datos = JSON.parse(localStorage.getItem("evaluaciones")) || [];

  datos.forEach((item) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${item.fecha}</td>
      <td>${item.empresa}</td>
      <td>${item.sector}</td>
      <td>${item.puesto}</td>
      <td>${item.tarea}</td>
      <td>${item.tabla}</td>
      <td>${item.altura}</td>
      <td>${item.distancia}</td>
      <td>${item.peso} kg</td>
      <td>${item.limite} kg</td>
      <td style="color: ${item.admisible ? "green" : "red"};">
        ${item.admisible ? "✅ Sí" : "❌ No"}
      </td>
    `;

    tabla.appendChild(fila);
  });
}

window.addEventListener("DOMContentLoaded", mostrarHistorial);
