import { Field, FieldType } from "./field";
import { ReactElement } from "react";
import { MarkRequired } from "./utils";

type FormComponents = Partial<
  Record<
    FieldType,
    (
      props: MarkRequired<Field<{ [key: string]: any }>, "onChange">
    ) => ReactElement
  >
>;

export type { FormComponents };
