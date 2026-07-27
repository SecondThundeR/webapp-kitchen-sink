import { StorageMethodCard } from "@/components/storage-method-card";
import { secureStorage } from "../storage";

export const RestoreItem = () => {
  return (
    <StorageMethodCard
      methodName="restoreItem"
      variant="key"
      methodHandler={secureStorage.restoreItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
