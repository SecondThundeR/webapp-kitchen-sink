import { StorageMethodCard } from "@/components/storage-method-card";
import { secureStorage } from "../storage";

export const GetItem = () => {
  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={secureStorage.getItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
