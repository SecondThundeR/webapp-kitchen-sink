import { type Control, useWatch } from "react-hook-form";
import { HookFormField } from "@/components/hook-form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { BUTTON_TYPES, TEXT_REQUIRED_TYPES } from "../constants";
import type { ShowPopupSchema } from "../schema";

interface ButtonItemProps {
  index: number;
  control: Control<ShowPopupSchema>;
  onRemove: (index: number) => void;
  onTextReset: (index: number) => void;
}

export const ButtonItem = ({
  index,
  control,
  onRemove,
  onTextReset,
}: ButtonItemProps) => {
  const currentType = useWatch({
    control,
    name: `buttons.${index}.type`,
  });
  const showTextField = TEXT_REQUIRED_TYPES.includes(currentType ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Button {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          <HookFormField
            fieldType="input"
            orientation="horizontal"
            name={`buttons.${index}.id`}
            control={control}
            placeholder="Enter ID"
          />
          <HookFormField
            fieldType="select"
            orientation="responsive"
            name={`buttons.${index}.type`}
            control={control}
            options={BUTTON_TYPES.map((type) => ({ label: type, value: type }))}
            onValueChange={(value) => {
              if (!TEXT_REQUIRED_TYPES.includes(value)) {
                onTextReset(index);
              }
            }}
          />
          {showTextField && (
            <HookFormField
              fieldType="input"
              orientation="horizontal"
              name={`buttons.${index}.text`}
              control={control}
              placeholder="Enter text"
            />
          )}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          onClick={() => onRemove(index)}
        >
          Remove button
        </Button>
      </CardFooter>
    </Card>
  );
};
