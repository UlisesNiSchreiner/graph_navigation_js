import { Spacing } from "../style";
import { Component } from '../../../../api/contract/Component';

export class TextInput extends Component {
  uiType = "text_input";

  backgroundColor?: string = "#ffffff";
  spacing?: Spacing = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };
  text?: string = "";
  output: string = "";
}
