import { Context } from "../context/index";
import Step from "./Step";
import Action from "./Action";
import { Component } from '../../api/contract/Component';
import { StepEvent } from "lib/api";
import { ObserverEvent } from "lib/ui";

export default class ViewStep extends Step {
  uiType: string = "empty_view_step";
  components?: Component[] = [];
  data?: object = {};
  stepObserverEvents?: ObserverEvent[] = [];
  stepPostableEvents?: StepEvent[] = [];
  backGroundColor?: string = "#ffffff";
  header?: Component;
  navigation?: Component;

  constructor(id: string) {
    super(id)
  }

  beforeAction?: typeof Action;
  builderAction?: typeof Action;
  afterAction?: typeof Action;

  override async execute(context: Context): Promise<Step | null> {
    await this.beforeAction?.(context);
    await this.builderAction?.(context);
    this.components = context.stepProxy!.visualComponents;
    context.stepProxy!.clearComponents();
    this.stepObserverEvents = context.stepProxy!.observerEvents;
    context.stepProxy!.clearObserverEvent();
    await this.afterAction?.(context);
    
    return this;
  }

  render(viewStep: ViewStep, nav: () => void): any {}
}
