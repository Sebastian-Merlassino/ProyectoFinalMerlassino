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
