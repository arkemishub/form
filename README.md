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
          boolean: ({field}) => (<input {...field} type="checkbox" onChange={(e) => field.onChange(e.target.value)} />),
          string: ({field}) => (<Input{...field} onChange={(e) => field.onChange(e.target.value)} />)
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
             render={({field, formState, fieldState}) => (
               <AvatarCustomComponent {...field} />
             )}
           />
         </div>
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
                boolean: ({field}) => (<input {...field} type="checkbox" />),
                string: ({field}) => (<input{...field} />)
            }}
        >
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
        </Form>
    )
}
```

## Manage the internal state

If you need to use the internal form state or useful functionalities, as looks the value of one field or reset the form
state, you can use the `useForm` hook.

The methods object is based on `react-hook-form` library, to understand all functionalities look the [React Hook Form Documentation](https://www.react-hook-form.com/)

```tsx
import { Form, FormField } from '@arkejs/form'

function Application() {
    const formProps = useForm();
    const { methods } = formProps;
    const { watch, reset } = methods;
    const nameValue = watch('name');
    return (
        <Form
            {...formProps}
            onSubmit={(values) => setData(values)}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto auto',
                    gridGap: '8px 20px',
                }}
            >
                <FormField id="name" type="string" />
                {nameValue.length > 0 &&<FormField id="surname" type="string"/>}
            </div>
            <button type="button" onClick={() => reset()}>Reset fields</button>
        </Form>
    )
}
```

## Define the DefaultValues

If you need to update the default values after first render you can pass fields directly on `useForm`:

```tsx
import { Form, FormField } from '@arkejs/form'

async function Application() {
    const responseFields = await axios.get('/fields')
    const formProps = useForm({
        fields: responseFields.data,
    });
    return(
        <Form
            {...formProps}
            onSubmit={(values) => setData(values)}
        >
            ...
        </Form>
    )
}
```