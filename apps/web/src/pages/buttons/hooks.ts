import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { BottomButton, BottomButtonParams } from "telegram-web-app";
import { WebApp } from "@/lib/web-app";

const SHINE_EFFECT_VERSION = "7.10";
const POSITION_VERSION = "7.10";
const ICON_CUSTOM_EMOJI_VERSION = "9.5";

interface UseBottomButtonOptions {
  button: BottomButton;
  label: string;
  resetParams: BottomButtonParams;
}

export const useBottomButton = ({
  button,
  label,
  resetParams,
}: UseBottomButtonOptions) => {
  const [color, setColor] = useState(() => button.color);
  const [hasShineEffect, setHasShineEffect] = useState(() =>
    WebApp.isVersionAtLeast(SHINE_EFFECT_VERSION)
      ? button.hasShineEffect
      : undefined,
  );
  const [isActive, setIsActive] = useState(() => button.isActive);
  const [isProgressVisible, setIsProgressVisible] = useState(
    () => button.isProgressVisible,
  );
  const [isVisible, setIsVisible] = useState(() => button.isVisible);
  const [text, setText] = useState(() => button.text);
  const [textColor, setTextColor] = useState(() => button.textColor);
  const [position, setPosition] = useState(() =>
    WebApp.isVersionAtLeast(POSITION_VERSION) ? button.position : undefined,
  );
  const [iconCustomEmojiId, setIconCustomEmojiId] = useState(() =>
    WebApp.isVersionAtLeast(ICON_CUSTOM_EMOJI_VERSION)
      ? button.iconCustomEmojiId
      : undefined,
  );

  const handleSetColor = (color: string | false) => {
    button.setParams({ color });
    setColor(button.color);
  };

  const handleSetTextColor = (textColor: string | false) => {
    button.setParams({ text_color: textColor });
    setTextColor(button.textColor);
  };

  const handleSetText = (text: string) => {
    button.setParams({ text });
    setText(button.text);
  };

  const handleSetPosition = (position: "left" | "right" | "top" | "bottom") => {
    if (!WebApp.isVersionAtLeast(POSITION_VERSION)) return;

    button.setParams({ position });
    setPosition(button.position);
  };

  const handleHasShineEffect = (hasShineEffect: boolean) => {
    if (!WebApp.isVersionAtLeast(SHINE_EFFECT_VERSION)) return;

    button.setParams({ has_shine_effect: hasShineEffect });
    setHasShineEffect(button.hasShineEffect);
  };

  const handleIsProgressVisible = (
    showProgress: boolean,
    leaveActive?: boolean,
  ) => {
    if (showProgress) {
      button.showProgress(leaveActive);
    } else {
      button.hideProgress();
    }
    setIsProgressVisible(button.isProgressVisible);
  };

  const handleHide = () => {
    button.hide();
    setIsVisible(false);
  };

  const handleShow = () => {
    button.show();
    setIsVisible(true);
  };

  const handleDisable = () => {
    button.disable();
    setIsActive(false);
  };

  const handleEnable = () => {
    button.enable();
    setIsActive(true);
  };

  const handleIconCustomEmojiId = (iconCustomEmojiId: string) => {
    if (!WebApp.isVersionAtLeast(ICON_CUSTOM_EMOJI_VERSION)) return;

    button.setParams({ icon_custom_emoji_id: iconCustomEmojiId });
    setIconCustomEmojiId(button.iconCustomEmojiId);
  };

  useEffect(() => {
    const onClick = () => {
      toast.info(`${label} button was clicked`);
    };

    button.onClick(onClick);

    return () => {
      button.offClick(onClick);
    };
  }, [button, label]);

  useEffect(() => {
    return () => {
      button.setParams(resetParams);
    };
  }, [button, resetParams]);

  return {
    data: {
      color,
      hasShineEffect,
      isActive,
      isProgressVisible,
      isVisible,
      text,
      textColor,
      position,
      iconCustomEmojiId,
    },
    handlers: {
      handleSetColor,
      handleHasShineEffect,
      handleIsProgressVisible,
      handleHide,
      handleShow,
      handleDisable,
      handleEnable,
      handleSetTextColor,
      handleSetText,
      handleSetPosition,
      handleIconCustomEmojiId,
    },
  };
};

const MAIN_BUTTON_RESET_PARAMS: BottomButtonParams = {
  color: false,
  has_shine_effect: false,
  is_active: true,
  is_visible: false,
  text: "Continue",
  text_color: false,
};

export const useMainButton = () =>
  useBottomButton({
    button: WebApp.MainButton,
    label: "Main",
    resetParams: MAIN_BUTTON_RESET_PARAMS,
  });

const SECONDARY_BUTTON_RESET_PARAMS: BottomButtonParams = {
  color: false,
  has_shine_effect: false,
  is_active: true,
  is_visible: false,
  text: "Cancel",
  position: "left",
  text_color: false,
};

export const useSecondaryButton = () =>
  useBottomButton({
    button: WebApp.SecondaryButton,
    label: "Secondary",
    resetParams: SECONDARY_BUTTON_RESET_PARAMS,
  });

export const useSettingsButton = () => {
  const [isVisible, setIsVisible] = useState(
    () => WebApp.SettingsButton.isVisible,
  );

  const handleIsVisible = (isVisible: boolean) => {
    if (isVisible) {
      WebApp.SettingsButton.show();
    } else {
      WebApp.SettingsButton.hide();
    }
    setIsVisible(isVisible);
  };

  useEffect(() => {
    const onClick = () => {
      toast.info("Settings button was clicked");
    };

    WebApp.SettingsButton.onClick(onClick);

    return () => {
      WebApp.SettingsButton.offClick(onClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      WebApp.SettingsButton.hide();
    };
  }, []);

  return {
    isVisible,
    handleIsVisible,
  };
};
