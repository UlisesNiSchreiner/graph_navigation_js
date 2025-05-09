
export interface RequestPayloadData {
  output: Record<string, any>;
  queryParams?: Record<string, any>;
}
export class RequestData {
  token?: string;
  session?: string;
  data?: RequestPayloadData = { output: {}, queryParams: {} };
  navigation?: string[];
  nextStep?: string;
  image?: unknown;
  private static _instance: RequestData | null = null;

  getData = <T>(key: string): T | null => {
    const output = (this.data as { output: Record<string, any> })?.output;
    if (output === undefined || output === null || !(key in output)) {
      return null;
    }
    return output[key] as T;
  }

  getImage = (): unknown => {
    return this.image;
  }

  setImage = (value: unknown): void => {
    this.image = value;
  }

  static TODO() {
    if (!RequestData._instance) {
      RequestData._instance = new RequestData();
    }
    RequestData._instance.data = { output: {}, queryParams: {} }
    return RequestData._instance;
  }
}
