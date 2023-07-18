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

import React, { Children, createContext, useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFormContext,
  useForm as useReactHookForm,
  FormProvider as ReactHookFormProvider,
} from "react-hook-form";
import {
  Field,
  FormConfigComponents,
  FormValue,
  FormProps,
  RenderProps,
} from "../../types";

export const FormContext = createContext<FormValue>({
  components: {} as FormConfigComponents,
  fields: [] as Field[],
});

function FormComponent(props: FormProps) {
  const { id, children, components, style, onChange, onSubmit } = props;
  const form = useFormContext();
  const { register, handleSubmit, setValue, getValues } = form;
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (fields.length > 0) {
      let tmpFields = [...fields];
      tmpFields = tmpFields.map((item) => {
        item.value = form.watch(item.id) ?? "";
        return item;
      });
      setFields(tmpFields);
    }
  }, [form]);

  useEffect(() => {
    let params = [...props.fields];
    let tmpFields = params.map((param) => {
      register(param.id);
      setValue(param.id, param.value);
      param.onChange = (value: any) => {
        const tmpParams = [...props.fields];
        const index = tmpParams.indexOf(param);
        tmpParams[index].value = value;
        setFields(tmpParams);
        setValue(param.id, value);
        onChange?.(getValues());
      };
      return param;
    });
    setFields(tmpFields);
    if (fields) {
      params = fields.map((f) => params.find((p) => p.id === f));
    }

    function walkAllChildren(root: any, callback: any) {
      function walk(e: any, parents: any) {
        callback(e, parents);
        const newParents = [...parents, e];
        Children.toArray(e.props?.children).forEach((c) => {
          walk(c, newParents);
        });
      }
      walk(root, []);
    }
    tmpFields = JSON.parse(JSON.stringify(tmpFields));
    walkAllChildren(
      children,
      (e: { props: { field: Field; render: RenderProps } }) => {
        if (e.props?.field && e.props?.render) {
          tmpFields = tmpFields.filter((item) => item.id !== e.props.field);
        }
      }
    );
  }, [props.fields]);

  return (
    <FormContext.Provider
      value={{
        components: components ?? ({} as FormConfigComponents),
        fields,
        onChange,
      }}
    >
      <form
        id={id}
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        style={style}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default function Form(props: FormProps) {
  const methods = useReactHookForm();
  return (
    <FormProvider {...(props.methods ?? methods)}>
      <FormComponent {...props}>{props.children}</FormComponent>
    </FormProvider>
  );
}

export const useForm = () => {
  const methods = useReactHookForm();
  return {
    methods,
  };
};
export const FormProvider = ReactHookFormProvider;
