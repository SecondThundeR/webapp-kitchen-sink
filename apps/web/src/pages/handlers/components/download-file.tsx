import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { WebApp } from "@/lib/web-app";

export const DownloadFile = () => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>downloadFile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Field>
          <Input
            id="file-url"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            placeholder="Enter file URL"
          />
        </Field>
        <Field>
          <Input
            id="file-name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter file name"
          />
        </Field>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            WebApp.downloadFile(
              {
                url,
                file_name: name,
              },
              (success) => {
                if (success) {
                  toast.success("Successfully downloaded file");
                } else {
                  toast.error("Failed to download file");
                }
              },
            );
          }}
          disabled={!url || !name}
        >
          Execute
        </Button>
      </CardFooter>
    </Card>
  );
};
