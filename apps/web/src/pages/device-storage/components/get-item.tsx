import { StorageMethodCard } from "@/components/storage-method-card";
import { useDeviceStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useDeviceStorage();

  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={handleGetItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
