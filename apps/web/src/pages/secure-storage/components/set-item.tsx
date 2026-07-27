import { StorageMethodCard } from "@/components/storage-method-card";
import { secureStorage } from "../storage";

export const SetItem = () => {
  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={secureStorage.setItem}
    />
  );
};
