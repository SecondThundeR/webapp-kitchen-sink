import { toast } from "sonner";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useExecuteMethod } from "@/hooks/use-execute-method";
import { WebApp } from "@/lib/web-app";

const schema = z.object({
  url: z.string().min(1, "File URL is required"),
  file_name: z.string().min(1, "File name is required"),
});

const FILE_FIELDS = [
  { name: "url", placeholder: "Enter file URL" },
  { name: "file_name", placeholder: "Enter file name" },
] as const;

export const DownloadFile = () => {
  const { form } = useExecuteMethod({
    methodName: "downloadFile",
    schema,
    defaultValues: { url: "", file_name: "" },
    onExecute: (params) =>
      WebApp.downloadFile(params, (success) => {
        if (success) {
          toast.success("Successfully downloaded file");
        } else {
          toast.error("Failed to download file");
        }
      }),
  });

  return (
    <ExecuteMethodCard methodName="downloadFile" form={form}>
      {FILE_FIELDS.map(({ name, placeholder }) => (
        <form.Field key={name} name={name}>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={placeholder}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
      ))}
    </ExecuteMethodCard>
  );
};
