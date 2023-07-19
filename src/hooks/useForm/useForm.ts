/**
 * Copyright 2023 Arkemis S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useForm as useReactHookForm } from "react-hook-form";
import { UseFormProps, UseFormReturn } from "./useForm.types";
import { useMemo, useState } from "react";
import { Field } from "../../types";

function useForm(props?: UseFormProps): UseFormReturn {
  const { fields, getFieldDefaultValue, ...forwarded } =
    props || ({} as UseFormProps);
  const [prevFields, setPrevFields] = useState<Field[] | undefined>(
    fields ?? undefined
  );

  const computedDefaultValues = useMemo(() => {
    if (getFieldDefaultValue) {
      return fields?.reduce((acc: Record<string, any>, field) => {
        acc[field.id] = getFieldDefaultValue?.(field);
        return acc;
      }, {});
    }
  }, [fields, getFieldDefaultValue]);

  const defaultValues = forwarded?.defaultValues || computedDefaultValues;
  const methods = useReactHookForm({ ...forwarded, defaultValues });

  // if fields changes, reset the form
  if (fields && JSON.stringify(prevFields) !== JSON.stringify(fields)) {
    methods.reset?.(defaultValues);
    setPrevFields(fields);
  }

  return { methods, formProps: { methods, fields } };
}

export default useForm;
