import Graph from "./Graph";
import Step from "./Step";

export default class Template extends Graph {
  constructor(startStep: Step) {
    super();
    this.id = startStep.id;
    this.graph = {
      ...this.graph,
      [startStep.id]: startStep,
    };
  }
}
