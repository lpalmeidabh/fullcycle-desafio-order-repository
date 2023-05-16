import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import SendMessageWhenCustomerAddressIsChangedHandler from "../event/customer/handler/send-message-when-customer-address-is-changed.handler";
import SendMessageWhenCustomerIsCreatedHandler from "../event/customer/handler/send-message-when-customer-is-created.handler";

import Address from "./address";

export default class Customer{
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _rewardPoints: number = 0;
  private _active: boolean = true;
  private eventDispatcher: EventDispatcher;
  constructor(id: string, name: string){
    this._id = id;
    this._name = name;   
    this.validate();
    this.eventDispatcher = new EventDispatcher();
    const eventHandler = new SendMessageWhenCustomerIsCreatedHandler();
    this.eventDispatcher.register('CustomerCreatedEvent', eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      message: "Esse é o primeiro console.log do evento: CustomerCreated"
    })

    const customerCreatedEvent2 = new CustomerCreatedEvent({
      message: "Esse é o segundo console.log do evento: CustomerCreated"
    })

    this.eventDispatcher.notify(customerCreatedEvent);
    this.eventDispatcher.notify(customerCreatedEvent2);
    
  }

  

  validate(){
    if(this._id.length === 0){
      throw new Error("Id is required");
    }
    if(this._name.length === 0){
      throw new Error("Name is required");
    }
  }

  
  set address(address: Address){
    this._address = address;
  }

  get id(){
    return this._id;
  }

  get name(){
    return this._name;
  }

  get rewardPoints(){
    return this._rewardPoints;
  }

  get address(){
    return this._address;
  }

  activate(){
    if(this._address === undefined){
      throw new Error("Address is required");
    }
    this._active = true;
  }

  deactivate(){
    this._active = false;
  }

  
  isActive(){
    return this._active;
  }

  changeName(name: string){
    this._name = name;
    this.validate()
  }

  changeAddress(address: Address){
    this._address = address;
    const eventHandler = new SendMessageWhenCustomerAddressIsChangedHandler();
    this.eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      message: `Endereço do cliente: ${this._id},${this._name} alterado para ${this._address.toString()}`
    })

    this.eventDispatcher.notify(customerAddressChangedEvent);
  }

  addRewardPoints(points: number){
    this._rewardPoints += points;
  }


}