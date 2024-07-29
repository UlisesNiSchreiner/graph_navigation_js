export interface Data {
  output: Record<string, any>;
}
export class Request {
    token?: string;
    session?: string;
    data?: Data = {output: {}};
    navigation?: string[];
    nextStep?: string;
    private static _instance: Request | null = null;

    constructor() {}

   /* getDataInOutput<T>(key: string): T | null {
      const output = (this.data as { output: Record<string, any> })?.output;
      if (output === undefined || output === null || !(key in output)) {
        return null;
      }
      return output[key] as T;
    }*/

    getDataInOutput = <T>(key: string): T | null => {
      const output = (this.data as { output: Record<string, any> })?.output;
      if (output === undefined || output === null || !(key in output)) {
        return null;
      }
      return output[key] as T;
    } 

    static TODO() {
      if (!Request._instance) {
        Request._instance = new Request();
      }
   
      return Request._instance;
    }    
  }
