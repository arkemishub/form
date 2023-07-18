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

import React, { ReactNode, useState } from "react";
import Form, { useForm } from "./Form";
import { FormConfigProvider } from "../FormConfigProvider/FormConfigProvider";
import FormField from "../FormField/FormField";
import mockData from "../../__mocks__/mockData";
import { Field } from "../../types";

export default {
  title: "Form",
  component: Form,
};

const GeneralFormProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FormConfigProvider
      components={{
        boolean: (props: {
          value: boolean | undefined;
          label: string;
          onChange(val: boolean): void;
        }) => (
          <div style={{ display: "flex" }}>
            {/*// @ts-ignore*/}
            <input
              {...props}
              type="checkbox"
              checked={props.value}
              onChange={(e) => props.onChange(e.target.checked)}
            />
            <div>{props.label}</div>
          </div>
        ),
        string: (props) => (
          <>
            <input
              {...props}
              placeholder={props.label}
              onChange={(e) => props.onChange(e.target.value)}
            />
          </>
        ),
        default: () => <div>Component not found</div>,
      }}
    >
      {children}
    </FormConfigProvider>
  );
};

export const Default = () => {
  const methods = useForm();
  const [fields] = useState<Field[]>(mockData);
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          fields={fields}
          onSubmit={(values) => setSubmitData(values)}
          // onChange={(values) => console.log(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {fields.map((field: { id: string }) => (
                <FormField key={`field-${field.id}`} id={field.id} />
              ))}
            </div>
            <button style={{ marginTop: 20 }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>
  );
};

export const WithFormProvider = () => {
  const formProps = useForm();
  const { methods } = formProps;
  const [fields] = useState<Field[]>(mockData);
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          {...formProps}
          fields={fields}
          onSubmit={(values) => setSubmitData(values)}
          // onChange={(values) => console.log(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {fields.map((field: { id: string }) => (
                <FormField key={`field-${field.id}`} id={field.id} />
              ))}
            </div>
            <button style={{ marginTop: 20 }}>Submit</button>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 4 }}>
            <button type="button" onClick={() => methods.reset({})}>
              Reset
            </button>
            <button type="button" onClick={() => methods.setValue("name", "")}>
              Clean name field
            </button>
            <button type="button" onClick={() => methods.register("name")}>
              register name field
            </button>
            <button type="button" onClick={() => methods.unregister("name")}>
              Unregister name field
            </button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>
  );
};

export const Render = () => {
  const [data] = useState<Field[]>(mockData);
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          fields={data}
          onSubmit={(values) => setSubmitData(values)}
          onChange={(values) => console.log(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              <FormField id="name" label="Your name" />
              <FormField id="surname" label="Your surname" />
              <FormField
                id="email"
                label="Email"
                render={(props: { onChange(val: string): void }) => (
                  <input
                    {...props}
                    type="email"
                    onChange={(e) => props.onChange(e.target.value)}
                  />
                )}
              />
              <FormField id="active" label="Is Active?" />
            </div>
            <button style={{ marginTop: 20 }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>
  );
};
