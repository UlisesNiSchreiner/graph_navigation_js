import { TextType } from "./style";
import { GravityValue, Spacing, TextSize } from "../style";
import { Component } from '../../../../api/contract/Component';

export class Text extends Component {
  uiType = "text";
  text = "";
  textType = TextType.NORMAL;
  color = "#000000";
  gravity = GravityValue.LEFT;
  truncate = false;
  backgroundColor?: string = "#ffffff";
  size?: TextSize = TextSize.MEDIUM
  spacing?: Spacing = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };
}
