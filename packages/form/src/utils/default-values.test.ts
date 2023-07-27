import { getFieldsDefaultValues } from "./default-values";
import { Field } from "../types";

describe("getFieldsDefaultValues", () => {
  it("should return undefined if fields is undefined", () => {
    expect(getFieldsDefaultValues(undefined)).toBeUndefined();
  });

  it("should apply getDefaultValueFn if provided", () => {
    const fields = [
      { id: "field1", value: "value1" },
      { id: "field2", value: "value2" },
    ];

    const getDefaultValueFn = (field: Field) => field.value + "test";
    expect(getFieldsDefaultValues(fields, getDefaultValueFn)).toEqual({
      field1: "value1test",
      field2: "value2test",
    });
  });

  it("should return correct default values with flat keys", () => {
    const fields = [
      { id: "field1", value: "value1" },
      { id: "field2", value: "value2" },
    ];
    expect(getFieldsDefaultValues(fields)).toEqual({
      field1: "value1",
      field2: "value2",
    });
  });

  it("should return correct default values with nested keys", () => {
    const fields = [
      { id: "field1", value: "value1" },
      { id: "field2.field3.field4.field5", value: "value2" },
    ];

    expect(getFieldsDefaultValues(fields)).toEqual({
      field1: "value1",
      field2: {
        field3: {
          field4: {
            field5: "value2",
          },
        },
      },
    });
  });
});
