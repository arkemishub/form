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

import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { CSSProperties, PropsWithChildren } from "react";
import { Field, FormComponents } from "../../types";

type FormProps<TFieldValues extends FieldValues = FieldValues> =
  PropsWithChildren<{
    id?: string;
    methods?: UseFormReturn<TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    style?: CSSProperties;
    className?: string;
    components?: FormComponents;
    fields?: Field[];
    onChange?: (event: { target: any; type?: any }) => void;
  }>;

export type { FormProps };
