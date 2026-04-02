import { useEffect, useState } from "react";
import { toast } from "sonner";
import { WebApp } from "@/lib/web-app";

export const useMainButton = () => {
  const [color, setColor] = useState(() => WebApp.MainButton.color);
  const [hasShineEffect, setHasShineEffect] = useState(() =>
    WebApp.isVersionAtLeast("7.10")
      ? WebApp.MainButton.hasShineEffect
      : undefined,
  );
  const [isActive, setIsActive] = useState(() => WebApp.MainButton.isActive);
  const [isProgressVisible, setIsProgressVisible] = useState(
    () => WebApp.MainButton.isProgressVisible,
  );
  const [isVisible, setIsVisible] = useState(() => WebApp.MainButton.isVisible);
  const [text, setText] = useState(() => WebApp.MainButton.text);
  const [textColor, setTextColor] = useState(() => WebApp.MainButton.textColor);
  const [iconCustomEmojiId, setIconCustomEmojiId] = useState(() =>
    WebApp.isVersionAtLeast("9.5")
      ? WebApp.MainButton.iconCustomEmojiId
      : undefined,
  );

  const handleSetColor = (color: string | false) => {
    WebApp.MainButton.setParams({
      color,
    });
    setColor(WebApp.MainButton.color);
  };

  const handleSetTextColor = (textColor: string | false) => {
    WebApp.MainButton.setParams({
      text_color: textColor,
    });
    setTextColor(WebApp.MainButton.textColor);
  };

  const handleSetText = (text: string) => {
    WebApp.MainButton.setParams({
      text,
    });
    setText(WebApp.MainButton.text);
  };

  const handleHasShineEffect = (hasShineEffect: boolean) => {
    if (!WebApp.isVersionAtLeast("7.10")) return;

    WebApp.MainButton.setParams({
      has_shine_effect: hasShineEffect,
    });
    setHasShineEffect(WebApp.MainButton.hasShineEffect);
  };

  const handleIsProgressVisible = (
    showProgress: boolean,
    leaveActive?: boolean,
  ) => {
    if (showProgress) {
      WebApp.MainButton.showProgress(leaveActive);
    } else {
      WebApp.MainButton.hideProgress();
    }
    setIsProgressVisible(WebApp.MainButton.isProgressVisible);
  };

  const handleHide = () => {
    WebApp.MainButton.hide();
    setIsVisible(false);
  };

  const handleShow = () => {
    WebApp.MainButton.show();
    setIsVisible(true);
  };

  const handleDisable = () => {
    WebApp.MainButton.disable();
    setIsActive(false);
  };

  const handleEnable = () => {
    WebApp.MainButton.enable();
    setIsActive(true);
  };

  const handleIconCustomEmojiId = (iconCustomEmojiId: string) => {
    if (!WebApp.isVersionAtLeast("9.5")) return;

    // Apparently, some clients can't change icon to new if it has one already
    // Resetting before setting new one
    if (WebApp.MainButton.iconCustomEmojiId) {
      WebApp.MainButton.setParams({
        icon_custom_emoji_id: undefined,
      });
    }

    WebApp.MainButton.setParams({
      icon_custom_emoji_id: iconCustomEmojiId,
    });
    setIconCustomEmojiId(WebApp.MainButton.iconCustomEmojiId);
  };

  useEffect(() => {
    const onClick = () => {
      toast.info("Main button was clicked");
    };

    WebApp.MainButton.onClick(onClick);

    return () => {
      WebApp.MainButton.offClick(onClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      WebApp.MainButton.setParams({
        color: false,
        has_shine_effect: false,
        is_active: true,
        is_visible: false,
        text: "Continue",
        text_color: false,
      });
    };
  }, []);

  return {
    data: {
      color,
      hasShineEffect,
      isActive,
      isProgressVisible,
      isVisible,
      text,
      textColor,
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
      handleIconCustomEmojiId,
    },
  };
};

export const useSecondaryButton = () => {
  const [color, setColor] = useState(() => WebApp.SecondaryButton.color);
  const [hasShineEffect, setHasShineEffect] = useState(() =>
    WebApp.isVersionAtLeast("7.10")
      ? WebApp.SecondaryButton.hasShineEffect
      : undefined,
  );
  const [isActive, setIsActive] = useState(
    () => WebApp.SecondaryButton.isActive,
  );
  const [isProgressVisible, setIsProgressVisible] = useState(
    () => WebApp.SecondaryButton.isProgressVisible,
  );
  const [isVisible, setIsVisible] = useState(
    () => WebApp.SecondaryButton.isVisible,
  );
  const [text, setText] = useState(() => WebApp.SecondaryButton.text);
  const [textColor, setTextColor] = useState(
    () => WebApp.SecondaryButton.textColor,
  );
  const [position, setPosition] = useState(() =>
    WebApp.isVersionAtLeast("7.10")
      ? WebApp.SecondaryButton.position
      : undefined,
  );
  const [iconCustomEmojiId, setIconCustomEmojiId] = useState(() =>
    WebApp.isVersionAtLeast("9.5")
      ? WebApp.SecondaryButton.iconCustomEmojiId
      : undefined,
  );

  const handleSetColor = (color: string | false) => {
    WebApp.SecondaryButton.setParams({
      color,
    });
    setColor(WebApp.SecondaryButton.color);
  };

  const handleSetTextColor = (textColor: string | false) => {
    WebApp.SecondaryButton.setParams({
      text_color: textColor,
    });
    setTextColor(WebApp.SecondaryButton.textColor);
  };

  const handleSetText = (text: string) => {
    WebApp.SecondaryButton.setParams({
      text,
    });
    setText(WebApp.SecondaryButton.text);
  };

  const handleSetPosition = (position: "left" | "right" | "top" | "bottom") => {
    if (!WebApp.isVersionAtLeast("7.10")) return;

    WebApp.SecondaryButton.setParams({
      position,
    });
    setPosition(WebApp.SecondaryButton.position);
  };

  const handleHasShineEffect = (hasShineEffect: boolean) => {
    if (!WebApp.isVersionAtLeast("7.10")) return;

    WebApp.SecondaryButton.setParams({
      has_shine_effect: hasShineEffect,
    });
    setHasShineEffect(WebApp.SecondaryButton.hasShineEffect);
  };

  const handleIsProgressVisible = (
    showProgress: boolean,
    leaveActive?: boolean,
  ) => {
    if (showProgress) {
      WebApp.SecondaryButton.showProgress(leaveActive);
    } else {
      WebApp.SecondaryButton.hideProgress();
    }
    setIsProgressVisible(WebApp.SecondaryButton.isProgressVisible);
  };

  const handleHide = () => {
    WebApp.SecondaryButton.hide();
    setIsVisible(false);
  };

  const handleShow = () => {
    WebApp.SecondaryButton.show();
    setIsVisible(true);
  };

  const handleDisable = () => {
    WebApp.SecondaryButton.disable();
    setIsActive(false);
  };

  const handleEnable = () => {
    WebApp.SecondaryButton.enable();
    setIsActive(true);
  };

  const handleIconCustomEmojiId = (iconCustomEmojiId: string) => {
    if (!WebApp.isVersionAtLeast("9.5")) return;

    // Apparently, some clients can't change icon to new if it has one already
    // Resetting before setting new one
    if (WebApp.SecondaryButton.iconCustomEmojiId) {
      WebApp.SecondaryButton.setParams({
        icon_custom_emoji_id: undefined,
      });
    }

    WebApp.SecondaryButton.setParams({
      icon_custom_emoji_id: iconCustomEmojiId,
    });
    setIconCustomEmojiId(WebApp.SecondaryButton.iconCustomEmojiId);
  };

  useEffect(() => {
    const onClick = () => {
      toast.info("Secondary button was clicked");
    };

    WebApp.SecondaryButton.onClick(onClick);

    return () => {
      WebApp.SecondaryButton.offClick(onClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      WebApp.SecondaryButton.setParams({
        color: false,
        has_shine_effect: false,
        is_active: true,
        is_visible: false,
        text: "Cancel",
        position: "left",
        text_color: false,
      });
    };
  }, []);

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
