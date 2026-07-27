import { StorageMethodCard } from "@/components/storage-method-card";
import { cloudStorage } from "../storage";

export const SetItem = () => {
  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={cloudStorage.setItem}
    />
  );
};
