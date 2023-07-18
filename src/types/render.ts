import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { Field } from "./field";

type RenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName> & Field;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

export type { RenderProps };
