import { MobileViewStep } from "../../mobile/step/MobileViewStep";

export class DesktopViewStep extends MobileViewStep {
  uiType = "desktop_version_layout";
  organizer: OrganizerType = "scrolling";
}
