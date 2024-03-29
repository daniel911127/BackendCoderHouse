import fs from 'fs';

class cartManager {
  static id = 0;
  constructor() {
    this.path = './carts.json';
    this.carts = [];
  }

  async readCarts() {
    let carts = await fs.promises.readFile(this.path, 'utf-8');
    let validacion = JSON.parse(carts);
    return validacion;
  }

  async getCarts() {
    let resp = await this.readCarts();
    return resp;
  }

  async getCartsProducts(ID) {
    let resp = await this.getCarts();
    let cart = resp.find((cart) => cart.id == ID);
    if (cart) {
      return cart.products;
    } else {
      return 'Carrito no encontrado';
    }
  }

  async newCart() {
    let carritos = await this.getCarts();
    let idviejo = carritos.length;
    let id = idviejo + 1;

    let newCart = { id, products: [] };
    this.carts = await this.getCarts();
    this.carts.push(newCart);
    console.log('Carrito agregado con exito');
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    return newCart;
  }

  async AddProductCart(cartId, prodId) {
    let carts = await this.getCarts();
    let cid = carts.findIndex((cart) => cart.id == cartId);

    if (cid !== -1) {
      let cartProducts = await this.getCartsProducts(cartId);
      console.log(cartProducts);
      let productId = cartProducts.findIndex(
        (product) => product.prodId == prodId
      );
      console.log(productId);
      if (productId !== -1) {
        cartProducts[productId].quantity = cartProducts[productId].quantity + 1;
      } else {
        cartProducts.push({ prodId, quantity: 1 });
      }

      carts[cid].products = cartProducts;

      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return `Producto agregado al carrito ${cartId} con exito `;
    } else {
      return `No se pudo agregar producto al carrito ${cartId}`;
    }
  }
}

export default cartManager;
