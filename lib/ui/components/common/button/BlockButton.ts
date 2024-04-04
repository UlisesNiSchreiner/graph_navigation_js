import { Spacing } from "../style";
import { Component } from '../../../../api/contract/Component';

export class BlockButton extends Component {
  uiType = "block_button";
  backgroundColor?: string = "#ffffff";
  color?: string = "#2e86c1";
  hoverColor?: string = "#aed6f1";
  disableOnFetching?: true;
  text?: string = "";
  spacing?: Spacing = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  };
}
