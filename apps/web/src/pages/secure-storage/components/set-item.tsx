import { StorageMethodCard } from "@/components/storage-method-card";
import { useSecureStorage } from "../hooks";

export const SetItem = () => {
  const { handleSetItem } = useSecureStorage();

  return (
    <StorageMethodCard
      methodName="setItem"
      variant="key-value"
      methodHandler={handleSetItem}
    />
  );
};
