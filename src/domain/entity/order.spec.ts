import Order from "./order";
import OrderItem from "./order_item";

describe('Order Unit Tests', () => {
    it('should be able to create an order', () => {
        
        const order = new Order("123", "123", [new OrderItem("123", "p1", "Item 1", 1, 10)]);
        expect(order).toBeDefined();
    });

    it('should be able to validate an order', () => {
        expect(() => new Order("", "", [])).toThrowError("Id is required");
    });

    it('should have at least one item on the order', () => {
        expect(() => new Order("123", "123", [])).toThrowError("Items is required");
    });

    it('should have all items with quantity greater than 0', () => {
      expect(() => new Order("123", "123", [new OrderItem("123", "p1", "Item 1", 10, 0)])).toThrowError("Quantity is required");
    })

    it('should be able to calculate the total of an order', () => {

        const order = new Order("123", "123", [
            new OrderItem("123", "p1", "Item 1", 1, 10),
            new OrderItem("123", "p2", "Item 2", 2, 20)
        ]);

        expect(order.total()).toEqual(50);
    })
})