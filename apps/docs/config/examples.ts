import Basic from "@/examples/basic";
import WithFormConfigProvider from "@/examples/form-config-provider";
import WithUseForm from "@/examples/use-form";
import WithDefaultValues from "@/examples/default-values";

const examples = [
  {
    id: "basic",
    component: Basic,
  },
  {
    id: "form-config-provider",
    component: WithFormConfigProvider,
  },
  {
    id: "use-form",
    component: WithUseForm,
  },
  {
    id: "default-values",
    component: WithDefaultValues,
  },
];

export default examples;
