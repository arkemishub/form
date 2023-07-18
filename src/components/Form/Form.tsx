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

import { FormProvider, useForm } from "react-hook-form";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  useMemo,
} from "react";
import { MarkRequired } from "../../types/utils";
import FormField from "../FormField/FormField";
import { useFormConfig } from "../FormConfigProvider/FormConfigProvider";
import { FormProps } from "./Form.types";

function FormComponent({
  id,
  onSubmit,
  className,
  style,
  methods: { handleSubmit },
  onChange,
  fields,
  ...props
}: MarkRequired<FormProps, "methods">) {
  const config = useFormConfig();
  const components = useMemo(
    () => ({ ...config.components, ...props.components }),
    [config.components, props.components]
  );

  const children = useMemo(() => {
    return Children.map(props.children, (child) => {
      if (isValidElement(child)) {
        if (child?.type === FormField) {
          return cloneElement(child as ReactElement, {
            components,
            fields,
            onChange,
          });
        }

        return child;
      }
    });
  }, [props.children]);

  return (
    <form
      id={id}
      onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
      className={className}
      style={style}
    >
      {children}
    </form>
  );
}

function Form(props: FormProps) {
  const defaultMethods = useForm();
  const methods = useMemo(
    () => props.methods ?? defaultMethods,
    [props.methods, defaultMethods]
  );

  return (
    <FormProvider {...methods}>
      <FormComponent {...props} methods={methods} />
    </FormProvider>
  );
}

Form.Field = FormField;
export default Form;
