class ProductManager {
  static id = 0;
  constructor() {
    this.products = [];
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const id = ++ProductManager.id;
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
    const CODE = this.products.filter((producto) => producto.code === code);
    if (CODE.length !== 0)
      return console.log('El codigo ya se encuentra en uso');

    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
  }

  getProducts() {
    return this.products.map((producto) => producto);
  }

  getProductById(ID) {
    const validacion = this.products.filter((producto) => producto.id === ID);
    const respuesta =
      validacion.length === 0
        ? 'El id del producto no se encuentra'
        : validacion;
    return respuesta;
  }
}

const productos = new ProductManager();

productos.addProduct({
  title: 'titulo',
  description: 'descripcion',
  price: '123',
  thumbnail: 'image',
  code: '001',
  stock: '20',
});
productos.addProduct({
  title: 'titulo2',
  description: 'descripcion2',
  price: '123',
  thumbnail: 'image2',
  code: '002',
  stock: '20',
});
productos.addProduct({
  title: 'titulo3',
  description: 'descripcion3',
  price: '123',
  thumbnail: 'image3',
  code: '003',
  stock: '20',
});
productos.addProduct({
  title: 'titulo4',
  description: 'descripcion4',
  price: '123',
  thumbnail: 'image4',
  code: '004',
  stock: '20',
});
productos.addProduct({
  title: '',
  description: 'descripcion4',
  price: '123',
  thumbnail: 'image4',
  code: '004',
  stock: '20',
});

const producto = productos.getProducts();
const productoId = productos.getProductById(5);
console.log(producto);
console.log(productoId);
