import { StorageMethodCard } from "@/components/storage-method-card";
import { secureStorage } from "../storage";

export const RemoveItem = () => {
  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={secureStorage.removeItem}
    />
  );
};
