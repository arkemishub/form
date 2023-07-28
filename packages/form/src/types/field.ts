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
import { ReactElement } from "react";
import { RenderProps } from "./render";

type GenericField<TField = any> = {
  id: string;
  render?: (props: RenderProps) => ReactElement;
  type?: FieldType | string;
  onChange?: (event: { target: any; type?: any }) => void;
};

type Field<TField = { [key: string]: any }> = GenericField & TField;

enum FieldType {
  Bool = "boolean",
  Date = "date",
  Datetime = "datetime",
  List = "list",
  Dict = "dict",
  link = "link",
  Float = "float",
  Integer = "integer",
  String = "string",
  Time = "time",
  Default = "default",
}

export type { Field, GenericField };
export { FieldType };
