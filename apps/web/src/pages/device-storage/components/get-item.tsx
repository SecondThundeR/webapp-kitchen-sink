import { StorageMethodCard } from "@/components/storage-method-card";
import { deviceStorage } from "../storage";

export const GetItem = () => {
  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={deviceStorage.getItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
