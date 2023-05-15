import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface{
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: {
        id: entity.id
      }
    })
  }
  async find(id: string): Promise<Product> {
    const foundProduct = await ProductModel.findOne({
      where: {
        id: id
      }
    })
    if(!foundProduct){
      throw new Error("Product not found");
    }
    return new Product(foundProduct.id, foundProduct.name, foundProduct.price);
  }
  async findAll(): Promise<Product[]> {
    const foundProducts = await ProductModel.findAll()
    return foundProducts.map(foundProduct => new Product(foundProduct.id, foundProduct.name, foundProduct.price));
  }
  
}