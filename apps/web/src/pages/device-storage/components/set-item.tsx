import { StorageMethodCard } from "@/components/storage-method-card";
import { deviceStorage } from "../storage";

export const SetItem = () => {
  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={deviceStorage.setItem}
    />
  );
};
