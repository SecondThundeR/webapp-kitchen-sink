import { toast } from "sonner";
import { z } from "zod";
import { ExecuteMethodCard } from "@/components/execute-method-card";
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
        <form.AppField key={name} name={name}>
          {(field) => <field.TextField placeholder={placeholder} />}
        </form.AppField>
      ))}
    </ExecuteMethodCard>
  );
};
