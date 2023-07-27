import { Field } from "../types";

function getFieldsDefaultValues(
  fields?: Field[],
  getDefaultValueFn?: (field: Field) => any
) {
  if (!fields) return undefined;

  return fields.reduce((acc: Record<string, unknown>, field) => {
    const defaultValue = getDefaultValueFn
      ? getDefaultValueFn(field)
      : field?.value;

    if (typeof defaultValue === "undefined") return acc;

    return assignDefaultValue(acc, field.id, defaultValue);
  }, {});
}

function assignDefaultValue(
  result: Record<string, any>,
  fieldId: string,
  defaultValue: unknown
) {
  if (!fieldId.includes(".")) {
    result[fieldId] = defaultValue;
    return result;
  }
  const [parent, ...rest] = fieldId.split(".");
  if (!result[parent]) {
    result[parent] = {};
  }
  result[parent] = assignDefaultValue(
    result[parent],
    rest.join("."),
    defaultValue
  );
  return result;
}

export { getFieldsDefaultValues };
