import { StorageMethodCard } from "@/components/storage-method-card";
import { useDeviceStorage } from "../hooks";

export const RemoveItem = () => {
  const { handleRemoveItem } = useDeviceStorage();

  return (
    <StorageMethodCard
      methodName="removeItem"
      variant="key"
      methodHandler={handleRemoveItem}
    />
  );
};
