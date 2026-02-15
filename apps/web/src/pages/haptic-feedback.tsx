import { Button } from "@/components/ui/button";
import { WebApp } from "@/lib/web-app";

export const HapticFeedbackPage = () => (
  <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-semibold tracking-tight">
      Haptic Feedback Playground
    </h1>
    <h2 className="text-xl">impactOccurred(style)</h2>
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={() => WebApp.HapticFeedback.impactOccurred("light")}>
        light
      </Button>
      <Button onClick={() => WebApp.HapticFeedback.impactOccurred("medium")}>
        medium
      </Button>
      <Button onClick={() => WebApp.HapticFeedback.impactOccurred("heavy")}>
        heavy
      </Button>
      <Button onClick={() => WebApp.HapticFeedback.impactOccurred("rigid")}>
        rigid
      </Button>
      <Button onClick={() => WebApp.HapticFeedback.impactOccurred("soft")}>
        soft
      </Button>
    </div>
    <h2 className="text-xl">notificationOccurred(type)</h2>
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => WebApp.HapticFeedback.notificationOccurred("error")}
      >
        error
      </Button>
      <Button
        onClick={() => WebApp.HapticFeedback.notificationOccurred("success")}
      >
        success
      </Button>
      <Button
        onClick={() => WebApp.HapticFeedback.notificationOccurred("warning")}
      >
        warning
      </Button>
    </div>
    <h2 className="text-xl">selectionChanged()</h2>
    <Button onClick={() => WebApp.HapticFeedback.selectionChanged()}>
      Test
    </Button>
  </div>
);
