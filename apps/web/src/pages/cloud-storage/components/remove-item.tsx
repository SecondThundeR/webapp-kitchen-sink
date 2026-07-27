import { StorageMethodCard } from "@/components/storage-method-card";
import { cloudStorage } from "../storage";

export const RemoveItem = () => {
  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={cloudStorage.removeItem}
    />
  );
};
