import { Event } from "../../api";

export class ConnectionEvent extends Event {
  type = "connection_event";
  conectionId: string = "";

  constructor(connectionId: string) {
    super();
    this.conectionId = connectionId;
  }
}
