import Address from "../../entity/address";
import Customer from "../../entity/customer";

describe('Customer Events Tests', () => {

  it('should send events when user is created', () => {
    const customer = new Customer("123", "Lucas Almeida");
    expect(customer.id).toBe("123");
  })

  it('should send events when user address is updated', () => {
    const customer = new Customer("123", "Lucas Almeida");
    const address = new Address("Rua 1", 1, "Sao Paulo", "30431121");
    customer.address = address;

    const address2 = new Address("Rua 2", 2, "Sao Paulo", "30431121");
    customer.changeAddress(address2)   

    expect(customer.address).toMatchObject(address2);

  })
})