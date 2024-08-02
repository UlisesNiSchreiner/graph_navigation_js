import SessionData from "../contrat/SessionData";
import { Component } from '../../api/contract/Component';
import { StepProxy } from './StepProxy';
import { DataProxy } from './DataProxy';
import { RequestData } from '../../api/contract/RequestData';

export class Context {
  requestData: RequestData = RequestData.TODO();
  data: object;
  component?: Component[] = [];
  stepProxy?: StepProxy;
  dataProxy: DataProxy = DataProxy.TODO();
  session: SessionData = SessionData.TODO();

  constructor(request: RequestData) {
    this.requestData = request;
    this.data = {};
    this.stepProxy = new StepProxy();
    this.dataProxy = new DataProxy();
  }

  getDataFromOutput<T>(key: string): T | null {
    const output = (this.requestData.data as { output: Record<string, any> })?.output;
    if (output === undefined || output === null || !(key in output)) {
      return null;
    }
    return output[key] as T;
  }
  
  getDataFromSession = <T>(key: string): T | null => this.session.getData<T>(key)

  setDataInSession = <T>(key: string, value: T): void => this.session.putData<T>(key, value)

  getDataFromContext = <T>(key: string): T | null => this.dataProxy.getData<T>(key)

  setDataInContext = <T>(key: string, value: T): void => this.dataProxy.putData<T>(key, value)
}
