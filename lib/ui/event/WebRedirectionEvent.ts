import { StepEvent } from '../../api/contract/StepEvent';

export class WebRedirectionEvent extends StepEvent {
  type = "web_redirection_event";
  path: string = "";

  constructor(path: string) {
    super();
    this.path = path;
  }
}
