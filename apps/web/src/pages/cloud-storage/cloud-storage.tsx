import { withWebAppVersion } from "@/hocs/web-app-version";
import { GetItem } from "./components/get-item";
import { GetItems } from "./components/get-items";
import { GetKeys } from "./components/get-keys";
import { RemoveItem } from "./components/remove-item";
import { RemoveItems } from "./components/remove-items";
import { SetItem } from "./components/set-item";

const CloudStorageComponent = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Cloud Storage Playground
      </h1>
      <div className="flex flex-col gap-4">
        <SetItem />
        <GetItem />
        <GetItems />
        <RemoveItem />
        <RemoveItems />
        <GetKeys />
      </div>
    </div>
  );
};

export const CloudStorage = withWebAppVersion(CloudStorageComponent, {
  version: "6.9",
  enablePlaceholder: true,
});
