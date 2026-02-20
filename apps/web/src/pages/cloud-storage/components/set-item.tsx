import { StorageMethodWithKeyValueExecuteCard } from "@/components/storage-method-with-key-value-execute-card.tsx";
import { useCloudStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useCloudStorage();

  return (
    <StorageMethodWithKeyValueExecuteCard
      methodName="setItem"
      methodHandler={handleSetItem}
    />
  );
};
