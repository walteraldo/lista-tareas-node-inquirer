require("colors");

const mostrarMenu = () => {
  return new Promise( resolve => {
    // cuerpo de la promesa
    console.clear(); // se limpia la consola
    // se imprime el menu
    console.log("=======================".green);
    console.log(" Seleccione una opción ".green);
    console.log("=======================\n".green);
    // se imprime la interfaz
    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir\n`);

    // creamos la interfaz para presentarle al usuario
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // leemos
    readline.question("Seleccione una opción: ", opt => {
      readline.close();
      resolve(opt); // lo que escribe el usuario lo mando acá
    });
  });
};

const pausa = () => {
  return new Promise( resolve => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para continuar\n`, opt => {
      readline.close();
      resolve(); // resuelvo la promesa
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa, // las dos funciones devuelven una promesa
};
