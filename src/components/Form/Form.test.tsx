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
import {
  Form,
  FormConfigProvider,
  FormField,
  FormProvider,
  useForm,
} from "../Form";
import { ReactNode } from "react";

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

const mockWatch = jest.fn(() => true);
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    handleSubmit: jest.fn(),
    getValues: jest.fn(),
    watch: mockWatch,
  }),
}));

const TestFormConfigProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FormConfigProvider
      components={{
        string: (props) => (
          <input
            {...props}
            data-testid={props.id}
            onChange={(e) => props.onChange(e.target.value)}
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
        <FormField id={"name"} />
        <FormField id={"surname"} />
        <button type="submit">Submit</button>
      </Form>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should call onSubmit when submit button is clicked", async () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(
      <Form fields={fields} onSubmit={onSubmit}>
        <FormField id={"name"} />
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
          <FormField id={"name"} label="Name" />
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
          <FormField id={"name"} />
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
          string: (props) => (
            <input
              {...props}
              data-testid={props.id}
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
        }}
      >
        <FormField id={"name"} />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );

    expect(getByTestId("name")).toBeInTheDocument();
  });

  test("should get methods with useHook and FormProvider", async () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => useForm());
    const methods = result.current;
    const { register, watch, getValues, reset } = methods;
    const { getByTestId } = render(
      <TestFormConfigProvider>
        <FormProvider {...methods}>
          <Form fields={fields} onSubmit={onSubmit}>
            <FormField id={"name"} />
            {watch("name") && <FormField id={"surname"} />}
            <button data-testid="form-submit" type="submit">
              Submit
            </button>
          </Form>
        </FormProvider>
      </TestFormConfigProvider>
    );

    expect(getByTestId("name")).toBeInTheDocument();
    expect(watch).toBeDefined();
    expect(register).toBeDefined();
    expect(reset).toBeDefined();
    expect(getValues).toBeDefined();
  });
});
