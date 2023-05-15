import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,      
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
    }))
    }, {
      include: [{
        model: OrderItemModel,        
      }]    
   })
  }  
  async update(entity: Order): Promise<void> {
  
    await OrderItemModel.destroy({
      where: {
        order_id: entity.id
      }
    })

    entity.items.forEach(async item => {
      await OrderItemModel.create({
        id: item.id,
        order_id: entity.id,
        product_id: item.productId,
        price: item.price,
        quantity: item.quantity,
        name: item.name
      })
    })

    await OrderModel.update({
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
    }))
    },{
      where: {
        id: entity.id
      },
      
    })

    await OrderModel
   
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: ["items"],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(id, orderModel.customer_id, []);
    orderModel.items.forEach(item => {
      order.addItem(new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity))
    })
    return order;
    
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll(
      {
        include: ["items"],
      }
    );

    const orders: Order[] = orderModels.map((orderModels) => {
      
      const orderItems: OrderItem[] = orderModels.items.map(item => {
        return new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity)
      })
      const order = new Order(orderModels.id, orderModels.customer_id, orderItems)
      
      return order
    });

    return orders;
  }
  
}