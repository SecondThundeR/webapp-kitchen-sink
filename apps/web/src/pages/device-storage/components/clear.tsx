import { StorageMethodExecuteCard } from "@/components/storage-method-execute-card.tsx";

import { useDeviceStorage } from "../hooks";

export const Clear = () => {
  const { handleClear } = useDeviceStorage();

  return (
    <StorageMethodExecuteCard methodName="clear" methodHandler={handleClear} />
  );
};
