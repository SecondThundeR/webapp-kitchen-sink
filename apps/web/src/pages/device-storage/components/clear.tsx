import { StorageMethodCard } from "@/components/storage-method-card";
import { useDeviceStorage } from "../hooks";

export const Clear = () => {
  const { handleClear } = useDeviceStorage();

  return <StorageMethodCard methodName="clear" methodHandler={handleClear} />;
};
