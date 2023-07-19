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

import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../Form";
import { ReactNode } from "react";
import { FormConfigProvider } from "../FormConfigProvider";
import { useForm } from "../../hooks";

const fields = [
  {
    default: null,
    helper_text: null,
    id: "name",
    label: "Name",
    max_length: null,
    min_length: null,
    multiple: false,
    required: false,
    type: "string",
    values: null,
  },
  {
    default: null,
    helper_text: null,
    id: "surname",
    label: "Surname",
    max_length: null,
    min_length: null,
    multiple: false,
    required: false,
    type: "string",
    values: null,
  },
];

const fieldsWithValue = [
  {
    default: "Default value",
    helper_text: null,
    id: "name",
    label: "Name",
    max_length: null,
    min_length: null,
    multiple: false,
    required: false,
    type: "string",
    values: null,
    value: "John",
  },
  {
    default: null,
    helper_text: null,
    id: "surname",
    label: "Surname",
    max_length: null,
    min_length: null,
    multiple: false,
    required: false,
    type: "string",
    values: null,
    value: "Doe",
  },
];

export const TestFormConfigProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <FormConfigProvider
      components={{
        string: ({ field }) => (
          <input
            {...field}
            data-testid={field.id}
            onChange={(e) => field.onChange(e.target.value)}
          />
        ),
      }}
    >
      {children}
    </FormConfigProvider>
  );
};

describe("Form", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Form fields={fields}>
        <Form.Field id={"name"} />
        <Form.Field id={"surname"} />
        <button type="submit">Submit</button>
      </Form>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should match snapshot with values", () => {
    const { asFragment } = render(
      <Form fields={fieldsWithValue}>
        <Form.Field id={"name"} />
        <Form.Field id={"surname"} />
        <button type="submit">Submit</button>
      </Form>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should call onSubmit when submit button is clicked", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Form fields={fields} onSubmit={onSubmit}>
        <Form.Field id={"name"} />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );

    await userEvent.click(getByTestId("form-submit"));
    expect(onSubmit).toHaveBeenCalled();
  });

  test("should call onChange when formField value change", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <Form fields={fields} onChange={onChange}>
          <Form.Field id={"name"} label="Name" />
        </Form>
      </TestFormConfigProvider>
    );

    await userEvent.type(getByTestId("name"), "User");
    expect(onChange).toHaveBeenCalled();
  });

  test("should render a input through the FormConfigProvider", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <Form fields={fields} onSubmit={onSubmit}>
          <Form.Field id={"name"} />
          <button data-testid="form-submit" type="submit">
            Submit
          </button>
        </Form>
      </TestFormConfigProvider>
    );

    expect(getByTestId("name")).toBeInTheDocument();
  });

  test("should render a input through the components props", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        components={{
          string: ({ field }) => (
            <input
              {...field}
              data-testid={field.id}
              onChange={(e) => field.onChange(e.target.value)}
            />
          ),
        }}
      >
        <Form.Field id={"name"} />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );

    expect(getByTestId("name")).toBeInTheDocument();
  });

  test("should render default component if component type doesn't exist", async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        components={{
          default: ({ field }) => <div>Component not found</div>,
        }}
      >
        <Form.Field id={"name"} />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );

    expect(getByText("Component not found")).toBeInTheDocument();
  });

  test("should Form.Field has value if Form has fields with value", async () => {
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <Form fields={fieldsWithValue}>
          <Form.Field id={"name"} label="Name" />
        </Form>
      </TestFormConfigProvider>
    );

    expect(getByTestId("name")).toHaveAttribute("value", "John");
  });

  test("should get defaultValue using getFieldDefaultValue", async () => {
    const { result } = renderHook(() =>
      useForm({
        fields: fieldsWithValue.map((item) => {
          // @ts-ignore
          item.defaultValue = item.default;
          return item;
        }),
        getFieldDefaultValue: (field) => field.defaultValue,
      })
    );
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <Form {...result.current.formProps}>
          <Form.Field id={"name"} label="Name" />
        </Form>
      </TestFormConfigProvider>
    );

    expect(getByTestId("name")).toHaveAttribute("value", "Default value");
  });

  test("should get methods and formProps with useHook", async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => useForm());
    const { register, watch, getValues, reset } = result.current.methods;
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <Form fields={fields} onSubmit={onSubmit}>
          <Form.Field id={"name"} />
          {watch("name") && <Form.Field id={"surname"} />}
          <button data-testid="form-submit" type="submit">
            Submit
          </button>
        </Form>
      </TestFormConfigProvider>
    );

    expect(getByTestId("name")).toBeInTheDocument();
    expect(watch).toBeDefined();
    expect(register).toBeDefined();
    expect(reset).toBeDefined();
    expect(getValues).toBeDefined();
  });
});
