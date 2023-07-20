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

import { FormProvider } from "react-hook-form";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { MarkRequired } from "../../types/utils";
import FormField from "../FormField/FormField";
import { useFormConfig } from "../FormConfigProvider/FormConfigProvider";
import { FormProps, OuterFormProps } from "./Form.types";
import { useForm } from "../../hooks";

function FormComponent({
  id,
  onSubmit,
  className,
  style,
  methods: { handleSubmit },
  onChange,
  fields,
  children,
  ...props
}: MarkRequired<FormProps, "methods">) {
  const config = useFormConfig();
  const components = useMemo(
    () => ({ ...config.components, ...props.components }),
    [config.components, props.components]
  );

  const buildChildren = useCallback(
    (children: ReactNode): ReactNode => {
      return Children.map(children, (child) => {
        if (isValidElement(child)) {
          const reactChild = child as ReactElement;

          if (reactChild?.type === FormField) {
            return cloneElement(reactChild, {
              components,
              fields,
              onChange,
            });
          }

          if (reactChild.props?.children) {
            return cloneElement(reactChild, {
              ...reactChild.props,
              children: buildChildren(reactChild.props.children),
            });
          }
        }

        return child;
      });
    },
    [fields, components, onChange]
  );

  return (
    <form
      id={id}
      onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
      className={className}
      style={style}
    >
      {buildChildren(children)}
    </form>
  );
}

function Form({ getFieldDefaultValue, ...props }: OuterFormProps) {
  const { methods: defaultMethods } = useForm(
    props?.fields
      ? {
          fields: props.fields,
          getFieldDefaultValue,
        }
      : undefined
  );
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
