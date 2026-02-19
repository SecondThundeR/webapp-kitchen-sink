import { Button } from "@/components/ui/button";
import { withWebAppVersion } from "@/hocs/web-app-version";
import { WebApp } from "@/lib/web-app";
import {
  HAPTIC_FEEDBACK_IMPACT_OCCURED_VALUES,
  HAPTIC_FEEDBACK_NOTIFICATION_OCCURED_VALUES,
} from "./constants";

const HapticFeedbackPageComponent = () => (
  <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-semibold tracking-tight">
      Haptic Feedback Playground
    </h1>
    <h2 className="text-xl">impactOccurred(style)</h2>
    <div className="grid grid-cols-2 gap-2">
      {HAPTIC_FEEDBACK_IMPACT_OCCURED_VALUES.map((value) => (
        <Button
          key={value}
          onClick={() => WebApp.HapticFeedback.impactOccurred(value)}
        >
          {value}
        </Button>
      ))}
    </div>
    <h2 className="text-xl">notificationOccurred(type)</h2>
    <div className="grid grid-cols-2 gap-2">
      {HAPTIC_FEEDBACK_NOTIFICATION_OCCURED_VALUES.map((value) => (
        <Button
          key={value}
          onClick={() => WebApp.HapticFeedback.notificationOccurred(value)}
        >
          {value}
        </Button>
      ))}
    </div>
    <h2 className="text-xl">selectionChanged()</h2>
    <Button onClick={() => WebApp.HapticFeedback.selectionChanged()}>
      Test
    </Button>
  </div>
);

export const HapticFeedbackPage = withWebAppVersion(
  HapticFeedbackPageComponent,
  { version: "6.1", enablePlaceholder: true },
);
