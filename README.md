# @arkejs/form

![Form](https://github.com/arkemishub/form/assets/81776297/58ae86d5-f84e-4877-ba8d-41b17b534748)

[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://github.com/arkemishub/arke-monorepo/blob/master/LICENSE.txt)

Form component to automate form generation process

## Usage

First of all, you need to install the library:

```shell
npm install @arkejs/form
pnpm install @arkejs/form
```

You can create a FormProvider to associate automatically a component from field type:

```tsx
import { FormConfigProvider } from '@arkejs/form'

function Application() {
  return (
    <FormConfigProvider
        components={{
          boolean: (props) => (<input {...props} type="checkbox" onChange={(e) => props.onChange(e.target.value)} />),
          string: (props) => (<Input{...props} onChange={(e) => props.onChange(e.target.value)} />)
        }}
    >
      ...
    </FormConfigProvider>
  )
}
```

Then you're able to import the Form and the FormField components:

```tsx
import { FormConfigProvider, Form, FormField } from '@arkejs/form'

function Application() {
  return (
    <FormConfigProvider>
      <Form
        onSubmit={(values) => setData(values)}
        onChange={(values) => console.log(values)}
      >
        {({ fields }) =>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto auto',
                gridGap: '8px 20px',
              }}
            >
              <FormField id="name" type="string" />
              <FormField id="surname" type="string"/>
              <FormField
                id="profile_image"
                // custom render ignore type 
                render={(props) => (
                  <AvatarCustomComponent {...props} />
                )}
              />
            </div>
          )}
      </Form>
    </FormConfigProvider>
  )
}
```

You can also use the Form without the general FormConfigProvider and use the `components` props to define the component
by field type

```tsx
import { Form, FormField } from '@arkejs/form'

function Application() {
    return (
        <Form
            onSubmit={(values) => setData(values)}
            onChange={(values) => console.log(values)}
            // Define here the components
            components={{
                boolean: (props) => (<input {...props} type="checkbox" />),
                string: (props) => (<input{...props} />)
            }}
        >
            {({ fields }) =>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto auto',
                        gridGap: '8px 20px',
                    }}
                >
                    <FormField id="name" type="string" />
                    <FormField id="surname" type="string"/>
                </div>
                )}
        </Form>
    )
}
```
