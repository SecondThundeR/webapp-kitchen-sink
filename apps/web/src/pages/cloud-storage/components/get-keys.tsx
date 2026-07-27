import { StorageMethodCard } from "@/components/storage-method-card";
import { cloudStorage } from "../storage";

export const GetKeys = () => {
  return (
    <StorageMethodCard
      methodName="getKeys"
      methodHandler={cloudStorage.getKeys}
      renderResult={(keys) => (
        <p>Keys: {keys?.length ? keys.join(", ") : "No keys"}</p>
      )}
    />
  );
};
