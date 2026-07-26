import { StorageMethodCard } from "@/components/storage-method-card";
import { useSecureStorage } from "../hooks";

export const GetItem = () => {
  const { handleGetItem } = useSecureStorage();

  return (
    <StorageMethodCard
      methodName="getItem"
      variant="key"
      methodHandler={handleGetItem}
      renderResult={(value) => value && <p>Value: {value}</p>}
    />
  );
};
