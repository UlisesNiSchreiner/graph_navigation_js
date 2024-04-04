import assert from "assert";
import Bifurcation from "./Bifurcation";
import { Context } from "../context";
import { Connection, Request } from "../../api";

describe("Bifurcation unit test", function () {
  it("test bifurcation when is executed with false condition then nex step conection is on false connection", async () => {
    const bifurcation = new Bifurcation();
    const trueConnection = new Connection();
    const falseConnection = new Connection();
    bifurcation.connections = {
      on_true_connection: trueConnection,
      on_false_connection: falseConnection,
    };
    const request = new Request();
    const context = new Context(request);

    bifurcation.condition = () => false;
    await bifurcation.execute(context);
    assert.equal(falseConnection, bifurcation.getNexStepConnection(context));
  });

  it("test bifurcation when is executed with true condition then nex step conection is on true connection", async () => {
    const bifurcation = new Bifurcation();
    const trueConnection = new Connection();
    const falseConnection = new Connection();
    bifurcation.connections = {
      on_true_connection: trueConnection,
      on_false_connection: falseConnection,
    };
    const request = new Request();
    const context = new Context(request);

    bifurcation.condition = () => true;
    await bifurcation.execute(context);
    assert.equal(trueConnection, bifurcation.getNexStepConnection(context));
  });

  it("test bifurcation when is navegated return itself", () => {
    const bifurcation = new Bifurcation();
    const nextStep = bifurcation.navigate("mock_step_id");
    assert.equal(bifurcation, nextStep);
  });
});
