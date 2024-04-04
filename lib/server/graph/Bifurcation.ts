import { Connection } from "../../api";
import { Context } from "../context/index";
import Node from "./Node";
import Step from "./Step";

export type TemplateCondition = (context: Context) => boolean;
export default class Bifurcation extends Node {
  condition: TemplateCondition = () => false;
  continueConnection: Connection = new Connection();

  override navigate(stepId: string): Node | null {
    return this;
  }

  override async execute(context: Context): Promise<Step | null> {
    if (this.condition(context)) {
      this.continueConnection = this.connections["on_true_connection"];
    } else {
      this.continueConnection = this.connections["on_false_connection"];
    }
    return null;
  }

  override getNexStepConnection(context: Context): Connection {
    return this.continueConnection;
  }
}
