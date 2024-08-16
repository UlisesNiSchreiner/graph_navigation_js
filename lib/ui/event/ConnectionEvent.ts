import { StepEvent } from '../../api/contract/StepEvent';

export class ConnectionEvent extends StepEvent {
  type = "connection_event";
  conectionId: string = "";

  constructor(connectionId: string) {
    super();
    this.conectionId = connectionId;
  }
}
