import { Connection } from "../../api";
import { Context } from "../context/index";
import Node from "./Node";

export default class Step extends Node {
  constructor(id: string = '') {
    super();
    this.id = id;
  }

  override navigate(stepId: string): Node | null {
    return this;
  }

  override getNexStepConnection(context: Context): Connection {
    const continueConnection: Connection = this.connections["continue"];
    return continueConnection;
  }
}
