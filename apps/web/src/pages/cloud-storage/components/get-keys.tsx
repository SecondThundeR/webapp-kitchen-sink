import { StorageMethodCard } from "@/components/storage-method-card";
import { useCloudStorage } from "../hooks";

export const GetKeys = () => {
  const { handleGetKeys } = useCloudStorage();

  return (
    <StorageMethodCard
      methodName="getKeys"
      methodHandler={handleGetKeys}
      renderResult={(keys) => (
        <p>Keys: {keys?.length ? keys.join(", ") : "No keys"}</p>
      )}
    />
  );
};
