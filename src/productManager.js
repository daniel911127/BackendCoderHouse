const fs = require('fs');

class ProductManager {
  static id = 0;
  constructor() {
    this.products = [];
    this.path = './productos.json';
  }

  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    stock,
  }) {
    let resp = await this.readProducts();
    let idviejo = resp.length;
    let id = idviejo + 1;
    if (title.length === 0)
      return console.log('Por favor indique el titulo del producto');
    if (description.length === 0)
      return console.log('Por favor indique la descripcion del producto');
    if (price.length === 0)
      return console.log('Por favor indique el precio del producto');
    if (thumbnail.length === 0)
      return console.log('Por favor indique la ruta de la imagen del producto');
    if (code.length === 0)
      return console.log('Por favor indique el codigo del producto');
    if (description.length === 0)
      return console.log('Por favor indique la descripcion del producto');
    if (stock.length === 0)
      return console.log('Por favor indique la cantidad de stock del producto');
    const CODE = resp.filter((producto) => producto.code === code);
    if (CODE.length !== 0)
      return console.log('El codigo ya se encuentra en uso');
    const nuevoProd = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      status,
      stock,
    };
    resp.push(nuevoProd);
    console.log('Producto agregado con exito');
    await fs.promises.writeFile(this.path, JSON.stringify(resp));
    return nuevoProd;
  }
  async readProducts() {
    let prods = await fs.promises.readFile(this.path, 'utf-8');
    let validacion = JSON.parse(prods);
    return validacion;
  }
  async getProducts() {
    let resp = await this.readProducts();
    return resp;
  }

  async getProductById(ID) {
    let resp = await this.readProducts();
    let filtro = resp.find((producto) => producto.id === ID);
    let validacion = filtro ? filtro : 'Not found';
    return validacion;
  }

  async deleteProduct(ID) {
    let resp = await this.readProducts();
    let filtro = resp.filter((producto) => producto.id !== ID);
    await fs.promises.writeFile(this.path, JSON.stringify(filtro));
    return `producto con id ${ID} fue eliminado con exito`;
  }

  //falta validar que exista el producto
  async updateProduct(ID, newData) {
    let resp = await this.readProducts();
    let actualizacion = resp.map((producto) =>
      producto.id === ID ? { ...producto, ...newData } : producto
    );
    await fs.promises.writeFile(this.path, JSON.stringify(actualizacion));
    return `producto con id ${ID} fue actualizado con exito`;
    //return 'Producto actualizado con éxito';
  }
}

const productos = new ProductManager();

// productos.addProduct({
//   title: 'titulo',
//   description: 'descripcion',
//   price: '123',
//   thumbnail: 'image',
//   code: '001',
//   stock: '20',
// });
// productos.addProduct({
//   title: 'titulo2',
//   description: 'descripcion2',
//   price: '123',
//   thumbnail: 'image2',
//   code: '002',
//   stock: '20',
// });
// productos.addProduct({
//   title: 'titulo3',
//   description: 'descripcion3',
//   price: '123',
//   thumbnail: 'image3',
//   code: '003',
//   stock: '20',
// });
// productos.addProduct({
//   title: 'titulo4',
//   description: 'descripcion4',
//   price: '123',
//   thumbnail: 'image4',
//   code: '004',
//   stock: '20',
// });
// productos.addProduct({
//   title: 'titulo5',
//   description: 'descripcion5',
//   price: '123',
//   thumbnail: 'image5',
//   code: '005',
//   stock: '20',
// });

productos.getProducts();
//productos.getProductById(2);

// productos.updateProduct(4, {
//   description: 'descripcion4 actualizada',
//   price: '124',
//   thumbnail: 'image4_nueva',
//   code: '004',
//   stock: '20',
// });

//productos.deleteProduct(5);

// productos.addProduct({
//   title: 'titulo5nuevo',
//   description: 'descripcion5',
//   price: '123',
//   thumbnail: 'image5',
//   code: '005',
//   stock: '20',
// });

module.exports = new ProductManager();
