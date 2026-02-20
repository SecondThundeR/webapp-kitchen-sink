import { StorageMethodWithKeyValueExecuteCard } from "@/components/storage-method-with-key-value-execute-card.tsx";
import { useSecureStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useSecureStorage();

  return (
    <StorageMethodWithKeyValueExecuteCard
      methodName="setItem"
      methodHandler={handleSetItem}
    />
  );
};
