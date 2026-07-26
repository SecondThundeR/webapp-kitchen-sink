import { StorageMethodCard } from "@/components/storage-method-card";
import { useCloudStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useCloudStorage();

  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={handleGetItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
