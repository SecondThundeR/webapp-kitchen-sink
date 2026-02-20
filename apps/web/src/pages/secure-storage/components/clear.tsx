import { StorageMethodExecuteCard } from "@/components/storage-method-execute-card.tsx";
import { useSecureStorage } from "../hooks";

export const Clear = () => {
  const { handleClear } = useSecureStorage();

  return (
    <StorageMethodExecuteCard methodName="clear" methodHandler={handleClear} />
  );
};
