// MATRIZ DE VALORES LÍMITE SEGÚN RESOLUCIÓN 295/03
const limites = [
    // Tabla 1
      { tabla: 1, altura: "Sobre el hombro", distancia: "Próximo", limite: 16 },
        { tabla: 1, altura: "Sobre el hombro", distancia: "Intermedio", limite: 7 },
          { tabla: 1, altura: "Nudillos a hombro", distancia: "Próximo", limite: 32 },
            { tabla: 1, altura: "Nudillos a hombro", distancia: "Intermedio", limite: 16 },
              { tabla: 1, altura: "Nudillos a hombro", distancia: "Alejado", limite: 9 },
                { tabla: 1, altura: "Espinilla a nudillos", distancia: "Próximo", limite: 18 },
                  { tabla: 1, altura: "Espinilla a nudillos", distancia: "Intermedio", limite: 14 },
                    { tabla: 1, altura: "Espinilla a nudillos", distancia: "Alejado", limite: 7 },
                      { tabla: 1, altura: "Desde el suelo a espinilla", distancia: "Próximo", limite: 14 },
  
                        // Tabla 2
                          { tabla: 2, altura: "Sobre el hombro", distancia: "Próximo", limite: 14 },
                            { tabla: 2, altura: "Sobre el hombro", distancia: "Intermedio", limite: 5 },
                              { tabla: 2, altura: "Nudillos a hombro", distancia: "Próximo", limite: 27 },
                                { tabla: 2, altura: "Nudillos a hombro", distancia: "Intermedio", limite: 14 },
                                  { tabla: 2, altura: "Nudillos a hombro", distancia: "Alejado", limite: 7 },
                                    { tabla: 2, altura: "Espinilla a nudillos", distancia: "Próximo", limite: 16 },
                                      { tabla: 2, altura: "Espinilla a nudillos", distancia: "Intermedio", limite: 11 },
                                        { tabla: 2, altura: "Espinilla a nudillos", distancia: "Alejado", limite: 5 },
                                          { tabla: 2, altura: "Desde el suelo a espinilla", distancia: "Próximo", limite: 14 },
  
                                            // Tabla 3
                                              { tabla: 3, altura: "Sobre el hombro", distancia: "Próximo", limite: 11 },
                                                { tabla: 3, altura: "Nudillos a hombro", distancia: "Próximo", limite: 14 },
                                                  { tabla: 3, altura: "Nudillos a hombro", distancia: "Intermedio", limite: 9 },
                                                    { tabla: 3, altura: "Nudillos a hombro", distancia: "Alejado", limite: 5 },
                                                      { tabla: 3, altura: "Espinilla a nudillos", distancia: "Próximo", limite: 9 },
                                                        { tabla: 3, altura: "Espinilla a nudillos", distancia: "Intermedio", limite: 7 },
                                                          { tabla: 3, altura: "Espinilla a nudillos", distancia: "Alejado", limite: 2 },
                                                          ];
  
                                                          // PREGUNTAS AL USUARIO
                                                          
                                                          let tabla;
                                                          do {tabla = prompt(
                                                            "Seleccione la duración y frecuencia de levantamientos (solo 1, 2 ó 3):\n1. Realiza tareas hasta 2 horas al día y con hasta 60 levantamientos por hora, o de mas de 2 horas al día y con hasta 12 levantamientos por hora\n2. Realiza tareas de mas de 2 horas al día y de 12 a 30 levantamientos por hora, o hasta 2 horas al día y de 60 a 360 levantamientos por hora\n3. Realiza tareas de mas de 2 horas al día y de 30 a 360 levantamientos por hora"
                                                            );
                                                            if (tabla === null) {
                                                              alert("Operación cancelada por el usuario.");
                                                              break;
                                                            }
                                                            tabla = parseInt(tabla);
                                                            } while (isNaN(tabla) || tabla < 1 || tabla > 3);
                                                            
  
                                                            let altura = Number(prompt(
                                                              "Seleccione la altura del levantamiento (solo 1, 2, 3 ó 4):\n1. Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo\n2. Desde la altura de los nudillos hasta por debajo del hombro\n3. Desde la mitad de la espinilla hasta la altura de los nudillos\n4. Desde el suelo hasta la mitad de la espinilla"
                                                              ));
                                                              let textoAltura = {
                                                                "1": "Hasta 30 cm por encima del hombro desde una altura de 8 cm por debajo del mismo",
                                                                  "2": "Desde la altura de los nudillos hasta por debajo del hombro",
                                                                    "3": "Desde la mitad de la espinilla hasta la altura de los nudillos",
                                                                      "4": "Desde el suelo hasta la mitad de la espinilla"
                                                                      }[altura];
  
                                                                      let distancia = Number(prompt(
                                                                        "Seleccione la distancia horizontal del levantamiento (solo 1, 2 ó 3):\n1. Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillos\n2. Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos\n3. Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos"
                                                                        ));
                                                                        let textoDistancia = {
                                                                          "1": "Levantamientos próximos: Origen < 30 cm desde el punto medio entre los tobillosimo",
                                                                            "2": "Levantamientos intermedios: Origen de 30 a 60 cm desde el punto medio entre los tobillos",
                                                                              "3": "Levantamientos alejados: Origen > 60 a 80 cm desde el punto medio entre los tobillos"
                                                                              }[distancia];
  
                                                                              let peso = parseFloat(prompt("Ingrese el peso real levantado (en Kg):"));
  
                                                                              // BÚSQUEDA EN LA MATRIZ
                                                                              let resultado = limites.find(item =>
                                                                                item.tabla === tabla &&
                                                                                  item.altura === textoAltura &&
                                                                                    item.distancia === textoDistancia
                                                                                    );
  
                                                                                    // MOSTRAR RESULTADO
                                                                                    if (!resultado) {
                                                                                      alert("⚠️ No se conoce un límite seguro para esa combinación según la resolución.");
                                                                                      } else {
                                                                                        if (peso <= resultado.limite) {
                                                                                            alert(`✅ La carga es admisible. Límite: ${resultado.limite} kg`);
                                                                                              } else {
                                                                                                  alert(`❌ La carga NO es admisible. Límite: ${resultado.limite} kg`);
                                                                                                    }
                                                                                                      console.log({
                                                                                                          Tabla: tabla,
                                                                                                              Altura: textoAltura,
                                                                                                                  Distancia: textoDistancia,
                                                                                                                      Peso: peso,
                                                                                                                          Límite: resultado.limite
                                                                                                                            });
                                                                                                                            }
  