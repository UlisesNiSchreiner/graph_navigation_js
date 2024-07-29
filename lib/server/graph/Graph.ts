import Bifurcation, { TemplateCondition } from "./Bifurcation";
import Node from "./Node";
import { Connection } from "../../api/contract/Connection";

export default class Graph extends Node {
  protected graph: Record<string, Node> = {};

  private addNodeToGraph(node: Node) {
    if (this.checkIfNodeExistInGraph(node.id)) {
      throw new Error(`Error inserting node ${node.id}. ID duplicated`);
    }
    if (this.checkIfNodeExistInAnyChildGraph(node.id)) {
      throw new Error(`Error inserting node ${node.id}. ID duplicated`);
    }

    this.graph = {
      ...this.graph,
      [node.id]: node,
    };
  }

  private checkIfNodeExistInGraph(nodeId: string): boolean {
    return this.graph.hasOwnProperty(nodeId);
  }

  private checkIfNodeExistInAnyChildGraph(nodeId: string): boolean {
    let result = null;
    const keys = Object.keys(this.graph);

    for (const key of keys) {
      const value = this.graph[key];
      result = value.navigate(nodeId);
      if (result !== null && result.id === nodeId) {
        return true;
      }
    }
    return false;
  }

  private addNodeToGraphIfNotExist(node: Node) {
    if (!this.checkIfNodeExistInGraph(node.id)) {
      this.addNodeToGraph(node);
    }
  }

  private addConnectionInNodeGraph(nodeId: string, connection: Connection) {
    if (this.checkIfNodeExistInGraph(nodeId)) {
      this.graph[nodeId].addOrRemplaceConnection(connection);
    }
  }

  nexFrom(nodeFrom: Node, nodeTo: Node, forceSync: boolean = false) {
    const nodeFromConnections = new Connection();
    nodeFromConnections.id = "continue";
    nodeFromConnections.stepTo = nodeTo.id;
    nodeFromConnections.forceSync = forceSync;

    if (!this.checkIfNodeExistInGraph(nodeTo.id)) {
      this.addNodeToGraph(nodeTo);
    }

    if (this.checkIfNodeExistInGraph(nodeFrom.id)) {
      this.addConnectionInNodeGraph(nodeFrom.id, nodeFromConnections);
    } else {
      nodeFrom.addOrRemplaceConnection(nodeFromConnections);
      this.addNodeToGraph(nodeFrom);
    }
  }

  linkFrom(
    // TODO fix pending: doesnt work without sync
    nodeFrom: Node,
    nodeTo: Node,
    linkId: string,
    forceSync: boolean = true
  ) {
    const nodeFromConnections = new Connection();
    nodeFromConnections.id = linkId;
    nodeFromConnections.stepTo = nodeTo.id;
    nodeFromConnections.forceSync = forceSync;
    nodeFrom.addOrRemplaceConnection(nodeFromConnections);

    //this.addNodeToGraph(nodeTo);
    if (!this.checkIfNodeExistInGraph(nodeTo.id)) {
      this.addNodeToGraph(nodeTo);
    }

    if (this.checkIfNodeExistInGraph(nodeFrom.id)) {
      this.addConnectionInNodeGraph(nodeFrom.id, nodeFromConnections);
    } else {
      nodeFrom.addOrRemplaceConnection(nodeFromConnections);
      this.addNodeToGraph(nodeFrom);
    }
  }

  bifurcationFrom(
    nodeFrom: Node,
    nodeOnTrue: Node,
    nodeOnFalse: Node,
    condition: TemplateCondition,
    forceSync: boolean = false
  ) {
    const bifurcationNode = new Bifurcation();
    bifurcationNode.condition = condition;
    bifurcationNode.id = `${nodeFrom.id}-${nodeOnTrue.id}-${nodeOnFalse.id}`;

    const nodeFromConnections = new Connection();
    nodeFromConnections.id = "continue";
    nodeFromConnections.stepTo = bifurcationNode.id;
    nodeFromConnections.forceSync = false;

    if (this.checkIfNodeExistInGraph(nodeFrom.id)) {
      this.addConnectionInNodeGraph(nodeFrom.id, nodeFromConnections);
    } else {
      nodeFrom.addOrRemplaceConnection(nodeFromConnections);
      this.addNodeToGraph(nodeFrom);
    }

    const onTrueConnection = new Connection();
    onTrueConnection.id = "on_true_connection";
    onTrueConnection.forceSync = forceSync;
    onTrueConnection.stepTo = nodeOnTrue.id;

    const onFalseConnection = new Connection();
    onFalseConnection.id = "on_false_connection";
    onFalseConnection.forceSync = forceSync;
    onFalseConnection.stepTo = nodeOnFalse.id;

    bifurcationNode.addOrRemplaceConnection(onTrueConnection);
    bifurcationNode.addOrRemplaceConnection(onFalseConnection);

    this.addNodeToGraph(bifurcationNode);
    this.addNodeToGraphIfNotExist(nodeOnTrue);
    this.addNodeToGraphIfNotExist(nodeOnFalse);
  }

  override getNexStepConnection(): Connection {
    const continueConnection: Connection = this.connections["continue"];
    return continueConnection;
  }

  override navigate(stepId: string): Node | null {
    let result = null;
    const keys = Object.keys(this.graph);

    for (const key of keys) {
      const value = this.graph[key];
      result = value.navigate(stepId);

      if (result !== null && result.id === stepId) {
        break;
      }
    }
    return result;
  }
}
