import { StorageMethodCard } from "@/components/storage-method-card";
import { cloudStorage } from "../storage";

export const GetItem = () => {
  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={cloudStorage.getItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
