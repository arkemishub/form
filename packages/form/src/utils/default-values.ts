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
