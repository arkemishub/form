import { PropsWithChildren } from "react";
import { FormComponents } from "../../types";

type FormConfigProviderProps = PropsWithChildren<{}> & {
  components?: FormComponents;
};

type FormConfigValue = {
  components: FormComponents;
};

export type { FormConfigValue, FormConfigProviderProps };
