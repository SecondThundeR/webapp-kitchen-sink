import { Component, type ErrorInfo, type PropsWithChildren } from "react";
import { ErrorScreen } from "./error-screen";

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo.componentStack);
  }

  override render() {
    const { error } = this.state;

    if (error) return <ErrorScreen message={error.message} />;

    return this.props.children;
  }
}
