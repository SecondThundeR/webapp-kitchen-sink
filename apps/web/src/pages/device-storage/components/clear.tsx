import { StorageMethodCard } from "@/components/storage-method-card";
import { deviceStorage } from "../storage";

export const Clear = () => {
  return (
    <StorageMethodCard methodName="clear" methodHandler={deviceStorage.clear} />
  );
};
