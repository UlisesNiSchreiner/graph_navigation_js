import { Event } from '../../api/contract/Event';

export class WebRedirectionEvent extends Event {
  type = "web_redirection_event";
  path: string = "";

  constructor(path: string) {
    super();
    this.path = path;
  }
}
