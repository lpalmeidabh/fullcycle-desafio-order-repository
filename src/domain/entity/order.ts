import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  

  validate(){
    if(this._id.length === 0){
      throw new Error("Id is required");
    }
    if(this._customerId.length === 0){
      throw new Error("CustomerId is required");
    }
    if(this._items.length === 0){
      throw new Error("Items is required");
    }
    if(this._items.some(item => item.quantity <= 0)){
      throw new Error("Quantity is required");
    }

  }

  get id(){
    return this._id;
  }

  get items(){
    return this._items;
  }

  get customerId(){
    return this._customerId;
  }

  addItem(item: OrderItem){
    this._items.push(item);
  }
  
  total() {
    return this._items.reduce((total, item) => total + item.total(), 0);
  }



}