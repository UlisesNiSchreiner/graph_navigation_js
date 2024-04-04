import { Request } from "../../api/index";
import SessionData from "../contrat/SessionData";
import { Component } from '../../api/contract/Component';
import { StepProxy } from './StepProxy';
import { DataProxy } from './DataProxy';

export class Context {
  request: Request;
  data: object;
  component?: Component[] = [];
  stepProxy?: StepProxy;
  dataProxy?: DataProxy;
  session?: SessionData;

  constructor(request: Request) {
    this.request = request;
    this.data = {};
    this.stepProxy = new StepProxy();
    this.dataProxy = new DataProxy();
  }

  getOutput(key: string) {
    return this.request.data;
  }
}
