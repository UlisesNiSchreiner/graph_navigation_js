import { Connection } from "../../api";
import { Context } from "../context/index";
import Step from "./Step";

export default abstract class Node {
  id: string = "empty_step";
  connections: Record<string, Connection> = {};

  addOrRemplaceConnection(connection: Connection) {
    this.connections = {
      ...this.connections,
      [connection.id]: connection,
    };
  }

  getNexStepConnection(context: Context): Connection {
    return new Connection();
  }

  navigate(stepId: string): Node | null {
    return null;
  }

  async execute(context: Context): Promise<Step | null> {
    return null;
  }
}
