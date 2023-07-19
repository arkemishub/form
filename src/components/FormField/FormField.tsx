import { FieldProps } from "./FormField.types";
import { Controller, useFormContext } from "react-hook-form";
import { FieldType } from "../../types";
import { useCallback } from "react";
import { RenderProps } from "../../types/render";

function FormField({ components, render, fields, id, ...props }: FieldProps) {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext();

  const field = fields?.find((item) => item.id === id);

  const renderField = useCallback(
    (props: RenderProps) => {
      if (field) {
        const type = field?.type as FieldType;

        if (render) return render(props);
        if (components?.[type]) return components[type]?.(props);
      }

      return null;
    },
    [render, components, field]
  );

  if (!field) return null;

  const defaultValue =
    field?.value ?? field?.defaultValue ?? defaultValues?.[id] ?? "";

  return (
    <Controller
      control={control}
      render={(params) => {
        return (
          renderField?.({
            ...params,
            field: {
              ...field,
              ...params.field,
              defaultValue,
              value: params.formState.isDirty
                ? params.field.value
                : defaultValue,
              id,
              onChange: (event) => {
                params.field.onChange(event);
                props.onChange?.(event);
              },
            },
          }) ?? <></>
        );
      }}
      name={id}
    />
  );
}

export default FormField;
