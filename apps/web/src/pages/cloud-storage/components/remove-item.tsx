import { StorageMethodCard } from "@/components/storage-method-card";
import { useCloudStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useCloudStorage();

  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={handleRemoveItem}
    />
  );
};
