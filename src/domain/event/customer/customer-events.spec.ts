import { Sequelize } from "sequelize-typescript";
import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

describe('Customer Events Tests', () => {

  let sequelize: Sequelize;

  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();

    

  });

  afterEach(async () => {
    await sequelize.close();
  });
  
  it('should send events when user is created', () => {

    let customer: Customer;
    const customerRepository = new CustomerRepository();
    customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "City 1", "30431121");
    customer.address = address;

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spy1 = jest.spyOn(eventHandler1, 'handle');
    const spy2 = jest.spyOn(eventHandler2, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
    const customerCreatedEvent = new CustomerCreatedEvent({})
    eventDispatcher.notify(customerCreatedEvent);
    
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();


  })

  it('should send events when user address is updated', () => {
    const customer = new Customer("123", "Lucas Almeida");
    const address = new Address("Rua 1", 1, "Sao Paulo", "30431121");
    customer.address = address;

    const address2 = new Address("Rua 2", 2, "Sao Paulo", "30431121");
    customer.changeAddress(address2)   

    const eventHandler = new EnviaConsoleLogHandler();
    const eventDispatcher = new EventDispatcher();
    
    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);
    const spy1 = jest.spyOn(eventHandler, 'handle');

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      customer: {
        id: customer.id,
        name: customer.name
      },
      address: customer.address.toString(),      
    })

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spy1).toHaveBeenCalled();

  })
})