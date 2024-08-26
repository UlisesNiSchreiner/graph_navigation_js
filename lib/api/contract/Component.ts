import { StepEvent } from "./StepEvent";

export class Component {
  id: string = "";
  uiType: string = "";
  onClickEvent?: StepEvent;
  onClickListEvent?: StepEvent[];
  data?: object = {};
  position?: string = "center";
}
