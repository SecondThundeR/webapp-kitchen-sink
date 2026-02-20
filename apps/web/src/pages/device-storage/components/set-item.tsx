import { StorageMethodWithKeyValueExecuteCard } from "@/components/storage-method-with-key-value-execute-card.tsx";
import { useDeviceStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useDeviceStorage();

  return (
    <StorageMethodWithKeyValueExecuteCard
      methodName="setItem"
      methodHandler={handleSetItem}
    />
  );
};
