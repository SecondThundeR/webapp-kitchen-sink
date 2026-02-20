import { StorageMethodWithKeyExecuteCard } from "@/components/storage-method-with-key-execute-card.tsx";
import { useDeviceStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useDeviceStorage();

  return (
    <StorageMethodWithKeyExecuteCard
      methodName="removeItem"
      methodHandler={handleRemoveItem}
    />
  );
};
