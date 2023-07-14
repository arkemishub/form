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

import React, {
  Children,
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FieldValues,
  SubmitHandler,
  useFormContext as useReactHookFormContext,
  useForm as useReactHookForm,
  FormProvider as ReactHookFormProvider,
} from "react-hook-form";
import { Field, RenderProps } from "../../types";

const FormConfigContext: any = createContext(undefined);
export const FormContext: any = createContext(undefined);

interface ArkeFormProps {
  id?: string;
  children: ReactNode;
  onChange?(data: FieldValues): void;
  onSubmit?(data: FieldValues): void;
  components?: Partial<{
    boolean(props: RenderProps): ReactNode;
    date(props: RenderProps): ReactNode;
    datetime(props: RenderProps): ReactNode;
    list(props: RenderProps): ReactNode;
    dict(props: RenderProps): ReactNode;
    link(props: RenderProps): ReactNode;
    float(props: RenderProps): ReactNode;
    integer(props: RenderProps): ReactNode;
    string(props: RenderProps): ReactNode;
    default(props: RenderProps): ReactNode;
  }>;
  fields: Field[];
  style?: CSSProperties;
}

export function FormConfigProvider({
  components,
  children,
}: {
  components: ArkeFormProps["components"];
  children: ReactNode;
}) {
  return (
    <FormConfigContext.Provider value={{ components }}>
      {children}
    </FormConfigContext.Provider>
  );
}

export default function Form(props: ArkeFormProps) {
  const { id, children, components, style, onChange, onSubmit } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useReactHookFormContext() ?? useReactHookForm();
  const { register, handleSubmit, setValue, getValues } = form;
  const [fields, setFields] = useState<Field[]>([]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.fields]);

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

  return (
    <FormContext.Provider value={{ fields, components, form, onChange }}>
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

export const useFormConfig: any = () => useContext(FormConfigContext);
export const useForm = () => useReactHookForm();

export const useArkeForm: any = () => useContext(FormContext);
export const FormProvider = ReactHookFormProvider;
