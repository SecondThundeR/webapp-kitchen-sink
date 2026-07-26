import { StorageMethodCard } from "@/components/storage-method-card";
import { useSecureStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useSecureStorage();

  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={handleRemoveItem}
    />
  );
};
