import { ClosingConfirmation } from "./components/closing-confirmation";

export const HandlersPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight pb-2">
        Handlers Playground
      </h1>
      <ClosingConfirmation />
    </div>
  );
};
