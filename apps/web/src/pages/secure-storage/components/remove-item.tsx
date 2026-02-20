import { StorageMethodWithKeyExecuteCard } from "@/components/storage-method-with-key-execute-card.tsx";
import { useSecureStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useSecureStorage();

  return (
    <StorageMethodWithKeyExecuteCard
      methodName="removeItem"
      methodHandler={handleRemoveItem}
    />
  );
};
