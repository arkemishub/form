import { Form, FormConfigProvider } from "@arkejs/form";
import { fields } from "@/examples/mocks/fields";
import { Input, Checkbox, Button } from "@arkejs/ui";
import { useState } from "react";

function MyForm() {
  const [data, setData] = useState({});

  const handleSubmit = (values: Record<string, unknown>) => {
    setData(values);
  };

  return (
    <FormConfigProvider
      components={{
        string: ({ field }) => <Input {...field} />,
        boolean: ({ field }) => <Checkbox {...field} checked={!!field.value} />,
      }}
    >
      <div>
        <div className="mb-8">Submitted data: {JSON.stringify(data)}</div>
        <Form fields={fields} onSubmit={handleSubmit}>
          <div className="grid gap-8">
            {fields.map((field) => (
              <Form.Field key={`field-${field.id}`} id={field.id} />
            ))}
          </div>
          <div className="mt-12">
            <Button color="primary">Submit</Button>
          </div>
        </Form>
      </div>
    </FormConfigProvider>
  );
}

export default MyForm;
