export class Request {
    token?: string;
    session?: string;
    data?: object;
    navigation?: string[];
    nextStep?: string;
  
    constructor() {}
  }