import { StepEvent } from '../../api/contract/StepEvent';

export class CustomEvent extends StepEvent {
  type = "custom_event";
  eventId: string = "";

  constructor(customId: string) {
    super();
    this.eventId = customId;
  }
}
