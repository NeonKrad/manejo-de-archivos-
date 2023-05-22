class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, field, value) {
    const product = this.getProductById(id);
    product[field] = value;
    return product;
  }

  deleteProduct(id) {
    const product = this.getProductById(id);
    this.products = this.products.filter(p => p !== product);
    return product;
  }
}
