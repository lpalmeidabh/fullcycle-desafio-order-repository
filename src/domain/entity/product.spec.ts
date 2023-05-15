import Product from "./product";

describe('Product Unit Tests', () => {

  it('should be able to create a product', () => {
    const product = new Product("123", "Product 1", 10);
    expect(product).toBeDefined();
  })

  it('should not be able to create a product without ID', () => {
    expect(() => new Product("", "", 0)).toThrowError("Id is required");
  })

  it('should not be able to create a product without name', () => {
    expect(() => new Product("123", "", 0)).toThrowError("Name is required");
  })

  it('should not be able to create a product without price', () => {
    expect(() => new Product("123", "Product 1", 0)).toThrowError("Price is required");
  })

  it('should be able to change the name of a product', () => {
    const product = new Product("123", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toEqual("Product 2");
  })

  it('should be able to change the price of a product', () => {
    const product = new Product("123", "Product 1", 10);
    product.changePrice(20);
    expect(product.price).toEqual(20);
  })
  
})