import type { UseFormProps as HookFormUseFormProps } from "react-hook-form";
import { Field } from "../../types";

type UseFormProps = HookFormUseFormProps &
  (
    | {
        getFieldDefaultValue: (field: Field) => any;
        fields: Field[] | (() => Promise<Field[]>);
      }
    | { fields?: undefined; getFieldDefaultValue?: undefined }
  );

export type { UseFormProps };
