import { RequestData } from '../../api/contract/RequestData';

export default class HttpClient {
  constructor() {}
  async post(request: RequestData): Promise<string> {
    return "{}";
  }
  async put(request: RequestData): Promise<string> {
    return "{}";
  }
}
