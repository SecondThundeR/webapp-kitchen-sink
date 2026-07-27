import { StorageMethodCard } from "@/components/storage-method-card";
import { secureStorage } from "../storage";

export const Clear = () => {
  return (
    <StorageMethodCard methodName="clear" methodHandler={secureStorage.clear} />
  );
};
