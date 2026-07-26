import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext } = createFormHookContexts();

// Field markup stays inline per the shadcn TanStack Form guide, so no pre-bound
// components are registered here - this hook exists for the composition
// helpers, which let a form be split across files without losing type safety
export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});
