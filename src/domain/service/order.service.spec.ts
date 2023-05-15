import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";


describe('Order Service Unit Tests', () => {

  it('should place an order', () => {

    const customer = new Customer("1", "Customer 1")
    const item1 = new OrderItem("1", "Prod 1", "Item 1", 10, 1);
    const item2 = new OrderItem("2", "Prod 2", "Item 2", 20, 2);

    const order = OrderService.placeOrder(customer, [item1, item2]);

    expect(customer.rewardPoints).toBe(25);
    expect(order.total()).toBe(50);

  })

  it('should throw an error when placing an order with no items', () => {
      
      const customer = new Customer("1", "Customer 1")
  
      expect(() => OrderService.placeOrder(customer, [])).toThrowError("Order must have at least one item");
  })

  it('should sum the total from all orders ', () => {

    const order1 = new Order("1", "1", [
        new OrderItem("1", "Prod 1", "Item 1", 10, 1), 
        new OrderItem("2", "Prod 2", "Item 2", 20, 2), 
        new OrderItem("3", "Prod 3", "Item 3", 30, 1)
      ]);

    const order2 = new Order("2", "2", [
        new OrderItem("4", "Prod 4", "Item 4", 40, 1),
        new OrderItem("5", "Prod 5", "Item 5", 50, 1),
        new OrderItem("6", "Prod 6", "Item 6", 60, 2)
      ]);

    const order3 = new Order("3", "3", [
        new OrderItem("7", "Prod 7", "Item 7", 70, 2),
        new OrderItem("8", "Prod 8", "Item 8", 80, 1),
        new OrderItem("9", "Prod 9", "Item 9", 90, 1)
      ]);

    const orders = [order1, order2, order3];

    const total = OrderService.sumTotal(orders);

    expect(total).toBe(600);
    
  });
})