import { StorageMethodCard } from "@/components/storage-method-card";
import { useCloudStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useCloudStorage();

  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={handleSetItem}
    />
  );
};
