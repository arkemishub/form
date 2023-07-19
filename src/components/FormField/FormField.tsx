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

import { FieldProps } from "./FormField.types";
import { Controller, useFormContext } from "react-hook-form";
import { FieldType } from "../../types";
import { useCallback } from "react";
import { RenderProps } from "../../types/render";

function FormField({ components, render, fields, id, ...props }: FieldProps) {
  const { control } = useFormContext();

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
