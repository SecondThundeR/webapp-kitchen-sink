import { toast } from "sonner";

import { t } from "@/i18n";

export const displayErrorToast = (error: unknown) => {
  toast.error(t("general.error"), {
    description:
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : t("general.somethingWhenWrong"),
  });
};
