import ViewStep from "../server/graph/ViewStep";
import { RequestData, Response, Connection } from "../api";
import ClientSessionStorage from "./contract/ClientSessionStorage";
import HttpClient from "./contract/HttpClient";

export default class ClientNavigation {
  httpClient: HttpClient;
  sessionStorage: ClientSessionStorage;

  responseBuffer: Response = new Response();
  navigationHistory: string[] = [];

  private clearNavigationHistory() {
    this.navigationHistory = [];
  }

  private addStepTONavigationHistory(stepId: string) {
    this.navigationHistory = [...this.navigationHistory, stepId];
  }

  private backInNavigationHistory(): string | null {
    return this.navigationHistory?.pop() ?? null;
  }

  hasBackNavigation() {
    this.navigationHistory.length > 1;
  }

  constructor(httpClient: HttpClient, sessionStorage: ClientSessionStorage) {
    this.httpClient = httpClient;
    this.sessionStorage = sessionStorage;
  }

  private isObjectEmpty(obj: Record<string, any>): boolean {
    for (const _ in obj) {
      return false;
    }
    return true;
  }

  getElementByKey(obj: Record<string, any>, key: string): any | undefined {
    return obj[key];
  }

  buildResponseFromJSON(json: string): Response {
    const jsonObject = JSON.parse(json);

    const { session, currentStep, steps } = jsonObject;

    const response: Response = {
      session,
      currentStep,
      steps,
    };

    return response;
  }

  private async fetchMiddleend(request: RequestData): Promise<Response> {
    let crudeResponse;
    const sessionStored = String(request.session);

    if (sessionStored.length <= 0) {
      crudeResponse = await this.httpClient.post(request);
    } else {
      crudeResponse = await this.httpClient.put(request);
    }

    const response = this.buildResponseFromJSON(crudeResponse);
    this.sessionStorage.putSessionId(response.session!);
    return response;
  }

  async navigate(
    connection: Connection,
    output: any,
    fetchingCallback: (isFetching: boolean) => {}
  ): Promise<ViewStep> {
    // TODO deberia recibir un objeto data en vez de output

    console.log("connection que llega: ", connection)
    console.log("output que llega: ", output)
    const shoudFetch =
      connection.forceSync || this.isObjectEmpty(this.responseBuffer.steps);
    console.log("el resultado es", shoudFetch)

    // If is force sync or local graph is empty should fetch middleend
    if (shoudFetch) {
      const request = new RequestData();
      request.data = {
        output: output,
      };
      request.nextStep = connection.stepTo;
      request.session = await this.sessionStorage.getSessionId();
      fetchingCallback(true);
      this.clearNavigationHistory();
      this.responseBuffer = await this.fetchMiddleend(request);
      fetchingCallback(false);
    }

    let stepToFindInLocalGrap: string;

    if (shoudFetch) {
      stepToFindInLocalGrap = this.responseBuffer.currentStep || "";
    } else {
      stepToFindInLocalGrap = connection.stepTo;
    }
    const response = this.getElementByKey(
      this.responseBuffer.steps,
      stepToFindInLocalGrap
    );
    this.addStepTONavigationHistory(connection.stepTo);
    return response;
  }

  async navigateBack(): Promise<ViewStep> {
    const backStepId = this.backInNavigationHistory();
    if (backStepId != null) {
      const response = this.getElementByKey(
        this.responseBuffer.steps,
        backStepId
      );
      return response;
    } else {
      throw Error("not back step to navigate");
    }
  }
}
