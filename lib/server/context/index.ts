import { Request } from "../../api/index";
import SessionData from "../contrat/SessionData";
import { Component } from '../../api/contract/Component';
import { StepProxy } from './StepProxy';
import { DataProxy } from './DataProxy';

export class Context {
  request: Request = Request.TODO();
  data: object;
  component?: Component[] = [];
  stepProxy?: StepProxy;
  dataProxy: DataProxy = DataProxy.TODO();
  session: SessionData = SessionData.TODO();

  constructor(request: Request) {
    this.request = request;
    this.data = {};
    this.stepProxy = new StepProxy();
    this.dataProxy = new DataProxy();
  }

  getDataFromOutput<T>(key: string): T | null {
    console.log("request ->", this.request)
    const output = (this.request.data as { output: Record<string, any> })?.output;
    if (output === undefined || output === null || !(key in output)) {
      return null;
    }
    return output[key] as T;
  }

  getDataFromOutputBis<T>(key: string): T | null {
    const request = this.request as Request
    console.log("request ->", request)
    console.log("request.getData ->", (request as any).getData); // Verifica si el método está presente
    if (typeof (request as any).getData !== 'function') {
      throw new Error("getData is not a function on request instance");
    }
    return request.getData<T>(key)
  }
  
  getDataFromSession = <T>(key: string): T | null => this.session.getDataInSession<T>(key)

  setDataInSession = <T>(key: string, value: T): void => this.session.setDataInSession<T>(key, value)

  getDataFromContext = <T>(key: string): T | null => this.dataProxy.getData<T>(key)

  setDataInContext = <T>(key: string, value: T): void => this.dataProxy.putData<T>(key, value)
}
