import { Spacing } from "../../ui/components/common/style";
import { StepEvent } from "./StepEvent";

export class Component {
  id: string = "";
  uiType: string = "";
  onClickEvent?: StepEvent;
  onClickListEvent?: StepEvent[];
  data?: object = {};
  position?: string = "center";
  spacing?: Spacing= {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };
}
