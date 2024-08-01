import Graph from "../graph/Graph";
import Node from "../graph/Node";
import SessionClient from "../contrat/SessionClient";
import SessionData from "../contrat/SessionData";
import Step from "../graph/Step";
import { Context } from "../context";
import { Connection, Response } from "../../api";

export class Version extends Graph {
  private response: Response;
  private sessionClient: SessionClient;

  constructor(sessionClient: SessionClient) {
    super();
    this.sessionClient = sessionClient;
    this.response = {
      steps: {},
    };
  }

  addStepToResponse(viewStep: Step, responseGraph: Node[]) {
    if (responseGraph.length === 0) {
      responseGraph.push(viewStep);
    } else {
      const newContinue = new Connection();
      newContinue.id = "continue";
      newContinue.stepTo = viewStep.id;
      responseGraph[responseGraph.length - 1].addOrRemplaceConnection(
        newContinue
      );
      responseGraph.push(viewStep);
    }
  }

  async versionNavigation(context: Context): Promise<[string, Node[]]> {
    let shouldContinueNavigating = true;
    let firstStepIdToNavegate = null;
    let actualStep = context.requestData.nextStep!;
    const responseGraph: Node[] = [];

    while (shouldContinueNavigating) {
      const step = this.navigate(actualStep);

      if (step === null) {
        shouldContinueNavigating = false;
        break;
      }
      const execution = await step.execute(context);
      if (execution !== null) {
        this.addStepToResponse(execution, responseGraph);
        if (firstStepIdToNavegate == null) {
          firstStepIdToNavegate = execution.id;
        }
      }

      const connection = step.getNexStepConnection(context);

      if (connection == undefined || connection.forceSync === true) {
        shouldContinueNavigating = false;
        break;
      }

      actualStep = connection.stepTo;
    }

    return [firstStepIdToNavegate ?? "", responseGraph];
  }

  generateResultObject(responseGraph: Node[]): { [key: string]: Step } {
    const objetoResultado: { [key: string]: Step } = {};
    responseGraph.forEach((item: Step) => {
      objetoResultado[item.id] = item;
    });
    return objetoResultado;
  }

  public async versionPostNavigate(context: Context): Promise<Response> {
    context.session = SessionData.TODO();
    const newSesion = await this.sessionClient.createSesion();
    console.log("session id", newSesion.id)
    context.session.data! = newSesion.data;
    context.session?.id == newSesion.id;

    const response: Response = { steps: {} };
    const [firstStepIdToNavegate, responseGraph] = await this.versionNavigation(
      context
    );

    response.session = newSesion.id;
    response.currentStep = firstStepIdToNavegate || context.requestData.nextStep!;

    await this.sessionClient.updateSesion(newSesion.id, context.session?.data);

    response.steps = this.generateResultObject(responseGraph);
    return response;
  }

  public async versionPutNavigate(context: Context): Promise<Response> {
    context.session = SessionData.TODO(); // TODO remove is by default
    const actualSession = await this.sessionClient.getSesion(
      context.requestData.session!
    );
    console.log("session id", actualSession.id)
    context.session.data! = actualSession.data;
    context.session?.id == actualSession.id;

    const response: Response = { steps: {} };
    const [firstStepIdToNavegate, responseGraph] = await this.versionNavigation(
      context
    );

    response.session = actualSession.id;
    response.currentStep = firstStepIdToNavegate || context.requestData.nextStep!;
    response.steps = this.generateResultObject(responseGraph);

    await this.sessionClient.updateSesion(
      actualSession.id,
      context.session?.data
    );

    return response;
  }
}
