import { ReactNode, useEffect, useState } from "react";
import { Form, FormConfigProvider, useForm, Field } from "@arkejs/form";
import {
  fields,
  fieldsWithValues,
  fieldsWithNestedFields,
} from "../mocks/fields.ts";

export default {
  title: "Form",
  component: Form,
};

const GeneralFormProvider = ({ children }: { children: any }) => {
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
          fields={fields}
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
              {fields.map((field: { id: string }) => (
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
          fields={fields}
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
              {fields.map((field: { id: string }) => (
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
          fields={fields}
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
    fields: fieldsWithValues,
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
              {fieldsWithValues.map((field) => (
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

export const WithNestedObjects = () => {
  const { formProps } = useForm({
    fields: fieldsWithNestedFields,
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
              {fieldsWithNestedFields.map((field) => (
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
      setFields(fieldsWithValues);
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
              {fieldsWithValues.map((field) => (
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
          fields={fields}
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

type SubComponentProps = { isTest: boolean; methods: any };
export const WithCustomFieldComponent = () => {
  const { methods } = useForm();
  const [submitData, setSubmitData] = useState({});

  const TestSubComponent = (props: SubComponentProps) => {
    console.log("TestSubComponentProps", props);
    return (
      <>
        <div>
          <div>Surname</div>
          <Form.Field id="surname" />
        </div>
      </>
    );
  };

  const TestComponent = (props: SubComponentProps) => {
    console.log("TestComponentProps", props);
    return (
      <>
        <div>
          <div>Name</div>
          <Form.Field id="name" />
        </div>
        <TestSubComponent {...props} />
      </>
    );
  };

  return (
    <>
      <GeneralFormProvider>
        <Form
          methods={methods}
          fields={fields}
          onSubmit={(values) => setSubmitData(values)}
        >
          <TestComponent isTest methods={methods} />
          <button style={{ marginTop: 20 }}>Submit</button>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>
  );
};

export const WithRulesValidation = () => {
  const { methods } = useForm();
  const {
    formState: { errors },
  } = methods;

  const ValidationWrapper = ({
    id,
    children,
  }: {
    id: string;
    children: ReactNode;
  }) => (
    <div>
      {children}
      <div style={Boolean(errors[id]) ? { color: "red" } : {}}>
        {errors[id]?.message as string}
      </div>
    </div>
  );

  return (
    <>
      <GeneralFormProvider>
        <Form
          methods={methods}
          fields={fields}
          onSubmit={(values) => console.log(values)}
        >
          <div>
            <ValidationWrapper id="name">
              <div>Name</div>
              <Form.Field
                id="name"
                rules={{
                  required: "Name is required",
                }}
              />
            </ValidationWrapper>
            <ValidationWrapper id="email">
              <div>Email</div>
              <Form.Field
                id="email"
                rules={{
                  required: "Email is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length is 4",
                  },
                  validate: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                }}
              />
            </ValidationWrapper>
          </div>
          <button style={{ marginTop: 20 }}>Submit</button>
        </Form>
      </GeneralFormProvider>
    </>
  );
};
