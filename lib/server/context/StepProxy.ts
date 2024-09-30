import { ObserverEvent } from 'lib/ui';
import { Component } from '../../api/contract/Component';

export class StepProxy {
  visualComponents: Component[] = [];
  observerEvents: ObserverEvent[] = [];
  header: Component | null = null;

  addComponent(component: Component) {
    this.visualComponents = [...this.visualComponents, component];
  }

  clearComponents() {
    this.visualComponents = [];
  }

  addObserverEvent(observerEvent: ObserverEvent) {
    this.observerEvents = [...this.observerEvents, observerEvent];
  }

  clearObserverEvent() {
    this.observerEvents = [];
  }

  addHeader(component: Component) {
    this.header = component
  }

  clearHeader() {
    this.header = null;
  }
}
