import { FieldType } from "./field";
import { ReactElement } from "react";
import { RenderProps } from "./render";

type FormComponents = Partial<
  Record<FieldType, (props: RenderProps) => ReactElement>
>;

export type { FormComponents };
