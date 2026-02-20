import { StorageMethodGetValueByKeyExecuteCard } from "@/components/storage-method-get-value-by-key-execute-card.tsx";
import { useSecureStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useSecureStorage();

  return (
    <StorageMethodGetValueByKeyExecuteCard
      methodName="getItem"
      methodHandler={handleGetItem}
    />
  );
};
