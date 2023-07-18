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

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormField from "./FormField";
import { Form } from "../Form";
import { TestFormConfigProvider } from "../Form/Form.test";
import { Field } from "../../types";

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

describe("FormField", () => {
  test("should match snapshot", () => {
    const { asFragment } = render(
      <TestFormConfigProvider>
        <Form fields={fields}>
          <FormField id={"name"} />
        </Form>
      </TestFormConfigProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render a input with render props", async () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Form fields={fields}>
        <FormField
          id={"name"}
          render={(props) => (
            <input {...props} data-testid={props.id} onChange={onChange} />
          )}
        />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );

    expect(getByTestId("name")).toBeInTheDocument();
    await userEvent.type(getByTestId("name"), "User");
    expect(onChange).toBeCalled();
  });

  test("should render element with updated values and props", async () => {
    let fields = [
      {
        default: null,
        helper_text: null,
        id: "select",
        label: "Select",
        max_length: null,
        min_length: null,
        multiple: false,
        required: false,
        type: "string",
        values: [{ value: 0, label: "Item 0" }],
      },
    ];

    const mockRender = jest.fn();
    const ComponentForm = ({ fields }: { fields: Field[] }) => (
      <Form fields={fields}>
        <FormField
          id={"select"}
          render={(renderProps) => {
            delete renderProps.onChange;
            return mockRender(renderProps);
          }}
        />
        <button data-testid="form-submit" type="submit">
          Submit
        </button>
      </Form>
    );
    const { rerender } = render(<ComponentForm fields={fields} />);

    const newFields = [
      {
        default: null,
        helper_text: null,
        id: "select",
        label: "Select",
        max_length: null,
        min_length: null,
        multiple: false,
        required: true,
        type: "string",
        values: [
          { value: 0, label: "Item 0" },
          { value: 1, label: "Item 1" },
          { value: 2, label: "Item 2" },
        ],
      },
    ];

    rerender(<ComponentForm fields={newFields} />);

    expect(mockRender).toHaveBeenLastCalledWith({
      default: null,
      helper_text: null,
      id: "select",
      label: "Select",
      max_length: null,
      min_length: null,
      multiple: false,
      required: true,
      type: "string",
      value: "",
      values: [
        { label: "Item 0", value: 0 },
        { label: "Item 1", value: 1 },
        { label: "Item 2", value: 2 },
      ],
    });
  });
});
