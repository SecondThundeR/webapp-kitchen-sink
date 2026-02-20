import { StorageMethodWithKeyExecuteCard } from "@/components/storage-method-with-key-execute-card.tsx";
import { useCloudStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useCloudStorage();

  return (
    <StorageMethodWithKeyExecuteCard
      methodName="removeItem"
      methodHandler={handleRemoveItem}
    />
  );
};
