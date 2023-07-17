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
import {
  CSSProperties,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { RenderProps } from "./RenderProps";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Field, FieldType } from "./Field";

type FormConfigComponents = Partial<
  Record<FieldType, (props: RenderProps) => ReactElement>
>;

type FormConfigProviderProps = PropsWithChildren<{}> & {
  components?: FormConfigComponents;
};

type FormConfigValue = {
  components: FormConfigComponents;
};

type FormValue = {
  components: FormConfigComponents;
  fields: Field[];
  onChange?(data: FieldValues): void;
};

type FormProps = {
  id?: string;
  children: ReactNode;
  onChange?(data: FieldValues): void;
  onSubmit?(data: FieldValues): void;
  components?: FormConfigComponents;
  fields: Field[];
  style?: CSSProperties;
  methods?: UseFormReturn;
};

export {
  FormConfigComponents,
  FormConfigProviderProps,
  FormConfigValue,
  FormValue,
  FormProps,
};
