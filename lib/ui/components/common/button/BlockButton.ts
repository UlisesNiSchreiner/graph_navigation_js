import { Component } from '../../../../api/contract/Component';
import { StepEvent } from "lib/api";

export class BlockButton extends Component {
  uiType = "block_button";
  backgroundColor?: string = "#ffffff";
  color?: string = "#2e86c1";
  textColor?: string = "#FFFFFF";
  hoverColor?: string = "#aed6f1";
  enableObserverEvent?: StepEvent;
  disableObserverEvent?: StepEvent;
  disableOnFetching?: true;
  text?: string = "";
  initialDisabled: boolean = false;
  type: "primary" | "outline" = "primary"
}
