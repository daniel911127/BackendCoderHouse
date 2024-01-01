//const fs = require('fs');
//import {promises as fs} from 'fs'; si lo hacemos asi debemos quitar promises de las peticiones
import fs from 'fs';

const producto = async () => {
  await fs.promises.writeFile(
    './productos.txt',
    'Hola esta es la lista de productos'
  );

  await fs.promises.appendFile(
    './productos.txt',
    '\nAcá vas a poder observar con que elementos contamos y sus caracteristicas'
  );

  let respuesta = await fs.promises.readFile('./productos.txt', 'utf-8');
  console.log(respuesta);

  await fs.promises.unlink('./productos.txt');
};

producto();
