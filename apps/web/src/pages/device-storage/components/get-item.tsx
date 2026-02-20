import { StorageMethodGetValueByKeyExecuteCard } from "@/components/storage-method-get-value-by-key-execute-card.tsx";
import { useDeviceStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useDeviceStorage();

  return (
    <StorageMethodGetValueByKeyExecuteCard
      methodName="getItem"
      methodHandler={handleGetItem}
    />
  );
};
