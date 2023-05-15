import Address from "./address";

export default class Customer{
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _rewardPoints: number = 0;
  private _active: boolean = true;

  constructor(id: string, name: string){
    this._id = id;
    this._name = name;   
    this.validate();
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
  }

  addRewardPoints(points: number){
    this._rewardPoints += points;
  }


}