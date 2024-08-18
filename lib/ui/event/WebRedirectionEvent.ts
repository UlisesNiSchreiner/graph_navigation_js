import { StepEvent } from '../../api/contract/StepEvent';

export class WebRedirectionEvent extends StepEvent {
  type = "web_redirection_event";
  path: string = "";
  queryParams: Record<string, string | number> = {}

  constructor(path: string, queryParams: Record<string, string | number>) {
    super();
    this.path = path;
    this.queryParams = queryParams
  }
}
