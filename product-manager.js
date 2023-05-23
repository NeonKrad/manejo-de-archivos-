const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.initialize();
  }

  initialize() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = [];
      this.saveData();
    }
  }

  saveData() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(product) {
    product.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    this.products.push(product);
    this.saveData();
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      console.log('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, field, value) {
    const product = this.getProductById(id);
    if (product) {
      product[field] = value;
      this.saveData();
    }
    return product;
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = this.products.splice(index, 1)[0];
      this.saveData();
      return deletedProduct;
    } else {
      console.log('Producto no encontrado');
    }
  }
}
