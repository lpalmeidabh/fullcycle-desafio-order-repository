import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";



export default class SendMessageWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent>{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(event.eventData.message);
  }
}
