import React, { createContext, useContext } from "react";
import {
  FormConfigComponents,
  FormConfigProviderProps,
  FormConfigValue,
} from "../../types";

const FormConfigContext = createContext<FormConfigValue>({
  components: {} as FormConfigComponents,
});

export function FormConfigProvider({
  components,
  children,
}: FormConfigProviderProps) {
  return (
    <FormConfigContext.Provider
      value={{ components: components ?? ({} as FormConfigComponents) }}
    >
      {children}
    </FormConfigContext.Provider>
  );
}

export const useFormConfig = () => useContext(FormConfigContext);
