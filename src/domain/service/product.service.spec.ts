import Product from "../entity/product";
import ProductService from "./product.service";

describe('Product Service Unit Test', () => {

  it('should change the prices for all products', () => {
    
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 50);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toEqual(200);
    expect(product2.price).toEqual(100);

  })

})