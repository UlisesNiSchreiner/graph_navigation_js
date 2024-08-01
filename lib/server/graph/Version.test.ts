import * as assert from "assert";
import { Version } from "./Version";
import ViewStep from "../graph/ViewStep";
import { Context } from "../context";
import SessionClient from "../contrat/SessionClient";
import SessionData from "../contrat/SessionData";
import { RequestData } from "lib/api";

describe("Version unit test", () => {
  class SessionClientMock extends SessionClient {
    sessionData = new SessionData();

    getSessionData() {
      this.sessionData.id = "mock_session_id";
      return this.sessionData;
    }

    override createSesion(): Promise<SessionData> {
      return Promise.resolve(this.getSessionData());
    }

    override async updateSesion(id: string, data: any): Promise<SessionData> {
      return Promise.resolve(this.getSessionData());
    }

    override async getSesion(id: string): Promise<SessionData> {
      return Promise.resolve(this.getSessionData());
    }
  }

  it('test versionPostNavigate when navigation is executed then session, current step and steps are correct', async () => {
    const sessionClient = new SessionClientMock();
    const version = new Version(sessionClient);
    const request = new RequestData();
    request.nextStep = "node_2";
    const context = new Context(request);

    const node1 = new ViewStep("node_1");
    const node2 = new ViewStep("node_2");
    const node3 = new ViewStep("node_3");

    version.nexFrom(node1, node2);
    version.nexFrom(node2, node3);

    const response = await version.versionPostNavigate(context);

    assert.ok(response.session);
    assert.equal("mock_session_id", response.session);
    assert.ok(response.currentStep);
    assert.equal("node_2", response.currentStep);
    assert.ok(response.steps);
    const expectedStepsId = ["node_2", "node_3"];
    assert.deepStrictEqual(
      expectedStepsId.sort(),
      Object.keys(response.steps).sort()
    );
  });
});
