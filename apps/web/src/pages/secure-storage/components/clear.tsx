import { StorageMethodCard } from "@/components/storage-method-card";
import { useSecureStorage } from "../hooks";

export const Clear = () => {
  const { handleClear } = useSecureStorage();

  return <StorageMethodCard methodName="clear" methodHandler={handleClear} />;
};
