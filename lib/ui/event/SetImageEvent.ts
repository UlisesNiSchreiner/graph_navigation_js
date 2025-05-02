import { StepEvent } from '../../api/contract/StepEvent';

export class SetImageEvent extends StepEvent {
  type = "set_image_event";
  img: File | Blob

  constructor(img: File | Blob) {
    super();
    this.img = img;
  }
}
