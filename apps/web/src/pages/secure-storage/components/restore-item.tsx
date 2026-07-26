import { StorageMethodCard } from "@/components/storage-method-card";
import { useSecureStorage } from "../hooks";

export const RestoreItem = () => {
  const { handleRestoreItem } = useSecureStorage();

  return (
    <StorageMethodCard
      methodName="restoreItem"
      variant="key"
      methodHandler={handleRestoreItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
