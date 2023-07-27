import { useState } from "react";
import { Form, useForm } from "@arkejs/form";
import { fieldsWithValues } from "@/examples/mocks/fields";
import { Input, Button } from "@arkejs/ui";

function MyForm() {
  const [data, setData] = useState({});
  const { formProps, methods } = useForm({
    fields: fieldsWithValues,
    getFieldDefaultValue: (field) => field.value,
  });

  const handleSubmit = (values: Record<string, unknown>) => {
    setData(values);
  };

  return (
    <div>
      <div className="mb-8">Submitted data: {JSON.stringify(data)}</div>
      <Form
        {...formProps}
        onSubmit={handleSubmit}
        components={{
          string: ({ field }) => <Input {...field} />,
        }}
      >
        <div className="grid gap-8">
          <Form.Field
            id="name"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={field.label}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Form.Field
            id="surname"
            render={({ field }) => (
              <Input
                {...field}
                placeholder={field.label}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>
        <div className="mt-12">
          <Button color="primary">Submit</Button>
        </div>
      </Form>
    </div>
  );
}

export default MyForm;
