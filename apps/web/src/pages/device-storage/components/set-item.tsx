import { StorageMethodCard } from "@/components/storage-method-card";
import { useDeviceStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useDeviceStorage();

  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={handleSetItem}
    />
  );
};
