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

import React, { ReactNode } from "react";
import { useForm, useFormConfig } from "../Form/Form";
import { RenderProps } from "../../types";

interface FormComponentProps {
  id: string;
  render?(props: RenderProps): ReactNode;
}

export default function FormField(
  props: FormComponentProps & Partial<RenderProps>
) {
  const config = useFormConfig();
  const { fields, components, form, onChange } = useForm();
  const { setValue, getValues } = form;
  const { id, render } = props;
  const componentProps = (({ id, render, ...o }) => o)(props); // remove id and render
  const defaultParams = {
    onChange: (value: any) => {
      setValue(id, value);
      onChange(getValues());
    },
  };
  const params =
    {
      ...fields?.filter((item: { id: string }) => item.id === id)?.[0],
      ...componentProps,
    } ?? defaultParams;

  const getComponent = () => {
    try {
      if (Object.keys(params).length > 0) {
        if (!render) {
          if (components?.[params?.type]) {
            return components[params?.type](params);
          } else {
            if (components?.default) {
              return components.default(params);
            } else {
              if (config?.components[params?.type])
                return config?.components[params?.type](params);
              return config?.components.default(params);
            }
          }
        } else {
          return render?.(params);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return <>{getComponent()}</>;
}
