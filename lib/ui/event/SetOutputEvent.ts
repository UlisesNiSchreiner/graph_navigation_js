import { StepEvent } from '../../api/contract/StepEvent';

export class SetOutputEvent extends StepEvent {
  type = "set_output_event";
  key: string = "";
  value: any;

  constructor(key: string, value: any) {
    super();
    this.key = key;
    this.value = value;
  }
}
