import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  let customer: Customer;
  let order: Order;
  let product: Product;
  let orderItem: OrderItem;
  const customerRepository = new CustomerRepository();
  const orderRepository = new OrderRepository();
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();

    
    customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "City 1", "30431121");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    
    product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    order = new Order("123", customer.id, [orderItem]);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: "123",
          product_id: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        }
      ]

    })

  })

  it("should update an order", async () => {
    
    await orderRepository.create(order);

    const product2 = new Product("1234", "Product 2", 10);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 2)
    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: "123",
          product_id: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        },
        {
          id: orderItem2.id,
          order_id: "123",
          product_id: orderItem2.productId,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,

        }
      ]

    })
  })

  it("should find an order", async () => {
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          order_id: "123",
          product_id: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
        }
      ]

    })
  })

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();

    expect(async () => {
      await orderRepository.find("456ABC");
    }).rejects.toThrow("Order not found");
  });

  it("should find all orders", async () => {
    await orderRepository.create(order);
    const product2 = new Product("1234", "Product 2", 10);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 2)

    const order2 = new Order("1234", customer.id, [orderItem2]);
    await orderRepository.create(order2);


    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  })

  
});

