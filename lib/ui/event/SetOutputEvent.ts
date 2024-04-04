import { Event } from '../../api/contract/Event';

export class SetOutputEvent extends Event {
  type = "set_output_event";
  key: string = "";
  value: any;

  constructor(key: string, value: any) {
    super();
    this.key = key;
    this.value = value;
  }
}
