import React, { createContext, useContext } from "react";
import type { FormComponents } from "../../types";
import type {
  FormConfigProviderProps,
  FormConfigValue,
} from "./FormConfigProvider.types";

const FormConfigContext = createContext<FormConfigValue>({
  components: {} as FormComponents,
});

function FormConfigProvider({ components, children }: FormConfigProviderProps) {
  return (
    <FormConfigContext.Provider
      value={{ components: components ?? ({} as FormComponents) }}
    >
      {children}
    </FormConfigContext.Provider>
  );
}

const useFormConfig = () => useContext(FormConfigContext) ?? {};

export default FormConfigProvider;
export { useFormConfig };
