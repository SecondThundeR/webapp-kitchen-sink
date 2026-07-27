import { isRouteErrorResponse, useRouteError } from "react-router";
import { ErrorScreen } from "@/components/error-screen";

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  }

  if (error instanceof Error) return error.message;

  return String(error);
};

export const RouteError = () => {
  const error = useRouteError();

  return <ErrorScreen message={getErrorMessage(error)} />;
};
