import { FieldProps } from "./FormField.types";
import { useFormContext } from "react-hook-form";
import { FieldType } from "../../types";
import { useCallback } from "react";

function FormField({ components, render, fields, id, ...props }: FieldProps) {
  const { register } = useFormContext();

  const field = fields?.find((item) => item.id === id);

  const renderField = useCallback(() => {
    if (field) {
      const { onChange, ...fieldProps } = register(field.id);
      const type = field?.type as FieldType;

      const handleChange = (event: { target: any; type?: any }) => {
        onChange(event);
        props?.onChange?.(event);
      };

      const params = { ...field, ...fieldProps, onChange: handleChange };
      if (render) return render(params);
      if (components?.[type]) return components[type]?.(params);
    }

    return null;
  }, [render, components, field]);

  return <>{renderField()}</>;
}

export default FormField;
