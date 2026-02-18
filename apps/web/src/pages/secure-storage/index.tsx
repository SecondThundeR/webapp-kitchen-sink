import { withWebAppVersion } from "@/hocs/web-app-version";
import { Clear } from "./components/clear";
import { GetItem } from "./components/get-item";
import { RemoveItem } from "./components/remove-item";
import { RestoreItem } from "./components/restore-item";
import { SetItem } from "./components/set-item";

const SecureStorageComponent = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Secure Storage Playground
      </h1>
      <div className="flex flex-col gap-4">
        <SetItem />
        <GetItem />
        <RestoreItem />
        <RemoveItem />
        <Clear />
      </div>
    </div>
  );
};

export const SecureStorage = withWebAppVersion(SecureStorageComponent, {
  version: "9.0",
  enablePlaceholder: true,
});
