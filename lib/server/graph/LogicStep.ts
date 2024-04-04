import { Context } from "../context/index";
import Step from "./Step";
import Action from "./Action";

export default class LogicStep extends Step {
  beforeAction?: typeof Action;
  builderAction?: typeof Action;
  afterAction?: typeof Action;

  constructor(id: string) {
    super(id);
  }

  override async execute(context: Context): Promise<Step | null> {
    await this.beforeAction?.(context);
    await this.builderAction?.(context);
    await this.afterAction?.(context);
    return null;
  }
}
