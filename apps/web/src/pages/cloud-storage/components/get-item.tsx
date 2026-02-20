import { StorageMethodGetValueByKeyExecuteCard } from "@/components/storage-method-get-value-by-key-execute-card.tsx";
import { useCloudStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useCloudStorage();

  return (
    <StorageMethodGetValueByKeyExecuteCard
      methodName="getItem"
      methodHandler={handleGetItem}
    />
  );
};
