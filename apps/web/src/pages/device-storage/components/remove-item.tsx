import { StorageMethodCard } from "@/components/storage-method-card";
import { deviceStorage } from "../storage";

export const RemoveItem = () => {
  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={deviceStorage.removeItem}
    />
  );
};
