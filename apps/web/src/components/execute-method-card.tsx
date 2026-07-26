import { type AnyFormApi, useSelector } from "@tanstack/react-form";
import { Children, type ReactNode, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

interface ExecuteMethodCardProps {
  methodName: string;
  // Any form, since every card brings its own shape - see useExecuteMethod
  form: AnyFormApi;
  description?: ReactNode;
  lastInvokedAt?: Date | null;
  // Whatever the method returned last time, rendered above the fields
  result?: ReactNode;
  submitLabel?: { idle: string; pending: string };
  // Extra actions rendered under the submit button
  footer?: ReactNode;
  children?: ReactNode;
}

export const ExecuteMethodCard = ({
  methodName,
  form,
  description,
  lastInvokedAt,
  result,
  submitLabel = { idle: "Execute", pending: "Executing" },
  footer,
  children,
}: ExecuteMethodCardProps) => {
  const formId = useId();
  const isSubmitting = useSelector(form.store, (state) => state.isSubmitting);
  // Children.toArray drops the falsy branches of conditionally rendered fields
  const hasContent = Boolean(result) || Children.toArray(children).length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{methodName}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {lastInvokedAt && (
          <CardDescription>
            Last invoked at: {lastInvokedAt.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      {/* display: contents keeps the card's own layout intact, and lets methods
          that take no arguments render no content section at all */}
      <form
        id={formId}
        className="contents"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        {hasContent && (
          <CardContent>
            <FieldGroup className="gap-4">
              {result}
              {children}
            </FieldGroup>
          </CardContent>
        )}
      </form>
      <CardFooter className="flex flex-col gap-2">
        <Button
          type="submit"
          form={formId}
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner data-icon="inline-start" />}
          {isSubmitting ? submitLabel.pending : submitLabel.idle}
        </Button>
        {footer}
      </CardFooter>
    </Card>
  );
};
