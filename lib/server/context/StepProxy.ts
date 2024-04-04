import { Component } from '../../api/contract/Component';

export class StepProxy {
  visualComponents: Component[] = [];

  addComponent(component: Component) {
    this.visualComponents = [...this.visualComponents, component];
  }

  clearComponents() {
    this.visualComponents = [];
  }
}
