import { StepEvent } from '../../api/contract/StepEvent';

export class ObserverEvent extends StepEvent {
    type = "observer_event";
    eventId: string = "";
    eventsToExecute: StepEvent[] = [];

    constructor(eventId: string, eventsToExecute: StepEvent[]) {
      super();
      this.eventId = eventId;
      this.eventsToExecute = eventsToExecute;
    }
  }
