import { guardarDb, leerDb } from "./helpers/guardarArchivo.js";
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDb = leerDb();
  if (tareasDb) {
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    // Imprimir el menú
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        // preguntar si está seguro
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea eliminada");
          }
        }
        break;
    }

    guardarDb(tareas.listadoArr);

    await pausa(); 
  } while (opt !== "0");
};

main();
