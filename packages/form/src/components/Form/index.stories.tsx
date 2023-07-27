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

import { ReactNode, useEffect, useState } from "react";
import { mockFields, mockFieldsWithValues } from "../../__mocks__/fields";
import Form from "./Form";
import { FormConfigProvider } from "../FormConfigProvider";
import { useForm } from "../../hooks";
import { Field } from "../../types";

export default {
  title: "Form",
  component: Form,
};

const GeneralFormProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FormConfigProvider
      components={{
        boolean: ({ field }) => (
          <div style={{ display: "flex" }}>
            <input
              {...field}
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
            <div>{field.label}</div>
          </div>
        ),
        string: ({ field }) => (
          <>
            <input
              {...field}
              placeholder={field.label}
              onChange={(e) => field.onChange(e.target.value)}
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
  const { methods } = useForm();
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          methods={methods}
          fields={mockFields}
          onSubmit={(values) => setSubmitData(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {mockFields.map((field: { id: string }) => (
                <Form.Field key={`field-${field.id}`} id={field.id} />
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
  const { methods } = useForm();

  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          methods={methods}
          fields={mockFields}
          onSubmit={(values) => setSubmitData(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {mockFields.map((field: { id: string }) => (
                <Form.Field key={`field-${field.id}`} id={field.id} />
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
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          fields={mockFields}
          onSubmit={(values) => setSubmitData(values)}
          onChange={(values) => console.log(values)}
          getFieldDefaultValue={(field) => field.value}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              <Form.Field id="name" label="Your name" />
              <Form.Field id="surname" label="Your surname" />
              <Form.Field
                id="email"
                label="Email"
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              <Form.Field id="active" label="Is Active?" />
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

export const WithDefaultValues = () => {
  const { formProps } = useForm({
    fields: mockFieldsWithValues,
    getFieldDefaultValue: (field) => field.value,
  });
  const [submitData, setSubmitData] = useState();

  return (
    <>
      <GeneralFormProvider>
        <Form {...formProps} onSubmit={(values) => setSubmitData(values)}>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {mockFieldsWithValues.map((field) => (
                <Form.Field key={`field-${field.id}`} id={field.id} />
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

export const WithChangingFields = () => {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setFields(mockFieldsWithValues);
    }, 2000);
  }, []);

  const { formProps } = useForm({
    fields,
    getFieldDefaultValue: (field) => field.value,
  });
  const [submitData, setSubmitData] = useState();

  return (
    <>
      Values will load after 2 seconds
      <GeneralFormProvider>
        <Form {...formProps} onSubmit={(values) => setSubmitData(values)}>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              {mockFieldsWithValues.map((field) => (
                <Form.Field key={`field-${field.id}`} id={field.id} />
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

export const WithInternalDependency = () => {
  const { methods } = useForm();
  const [submitData, setSubmitData] = useState({});

  return (
    <>
      <GeneralFormProvider>
        <Form
          methods={methods}
          fields={mockFields}
          onSubmit={(values) => setSubmitData(values)}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto",
                gridGap: "8px 20px",
              }}
            >
              <Form.Field
                id="name"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={field.label}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      methods.setValue("surname", "Test");
                    }}
                  />
                )}
              />
              <Form.Field
                id="surname"
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder={field.label}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
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