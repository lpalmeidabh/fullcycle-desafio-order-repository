import Address from "./address";
import Customer from "./customer";

describe('Customer Unit Tests', () => {

  it('should be able to create a customer', () => {
    const customer = new Customer("123", "Lucas Almeida");
    const address = new Address("Rua 1", 1, "Sao Paulo", "30431121");
    customer.address = address;
    customer.activate();
    expect(customer).toBeDefined();
  });


  it('should not be able to create a customer without id', () => {
      expect(() => new Customer("", "Lucas Almeida")).toThrow(new Error("Id is required"));
  });

  it('should not be able create a customer without name', () => {
    expect(() => new Customer("123", "")).toThrow(new Error("Name is required"));
  })

  it('should be able to change name', () => {
    const customer = new Customer("123", "Lucas Almeida");
    customer.changeName("Lucas Almeida 2");
    expect(customer.name).toBe("Lucas Almeida 2");
  })
  
  it('should not be able to change name to a blank name', () => {
    const customer = new Customer("123", "Lucas Almeida");
    expect(() => customer.changeName("")).toThrow(new Error("Name is required"));
  })

  it('should be able to activate a customer', () => {
    const customer = new Customer("123", "Lucas Almeida");
    const address = new Address("Rua 1", 123, "São Paulo", "123423");
    customer.address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  })

  it('should not be able to activate a customer without address', () => {
    const customer = new Customer("123", "Lucas Almeida");
    expect(() => customer.activate()).toThrow(new Error("Address is required"));
  })

  it('should be able to deactivate a customer', () => {
    const customer = new Customer("123", "Lucas Almeida");
    const address = new Address("Rua 1", 123, "São Paulo", "123423");
    customer.address = address;
    customer.activate();
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  })

  it('should be able to add reward points', () => {
    const customer = new Customer("123", "Lucas Almeida");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
    
});
