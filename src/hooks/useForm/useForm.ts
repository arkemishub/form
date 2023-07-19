import { useForm as useReactHookForm, UseFormReturn } from "react-hook-form";
import { UseFormProps } from "./useForm.types";
import { useCallback, useMemo } from "react";
import { Field } from "../../types";

function useForm(props?: UseFormProps): UseFormReturn {
  const { fields, getFieldDefaultValue, ...forwarded } =
    props || ({} as UseFormProps);

  const getAllDefaultValues = useCallback(
    (fields: Field[]) =>
      fields?.reduce((acc: Record<string, any>, field) => {
        acc[field.id] = getFieldDefaultValue?.(field);
        return acc;
      }, {}),
    [getFieldDefaultValue]
  );

  const computedDefaultValues = useMemo(() => {
    if (getFieldDefaultValue) {
      if (typeof fields === "function") {
        return async () => await fields().then(getAllDefaultValues);
      }

      return getAllDefaultValues(fields);
    }
  }, [fields, getFieldDefaultValue, getAllDefaultValues]);

  const defaultValues = forwarded?.defaultValues || computedDefaultValues;

  return useReactHookForm({ ...forwarded, defaultValues });
}

export default useForm;
