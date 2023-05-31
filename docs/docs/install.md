---
sidebar_position: 1
title: Install
---

`@arkejs/form` Arke form is a component to automate form generation process

Is available on npm registry, visit [https://www.npmjs.com/package/@arkejs/form](https://www.npmjs.com/package/@arkejs/form)

Install the library running:

```sh
pnpm install @arkejs/form
```

## Step 1: Create a FormConfigProvider

You can create a FormConfigProvider to associate automatically a component to field type:

```js
import { FormConfigProvider } from '@arkejs/form'

function Application() {
    return (
        <FormConfigProvider
            components={{
                boolean: (props) => (<input {...props} type="checkbox" onChange={(e) => props.onChange(e.target.value)} />),
                string: (props) => (<MaterialInput {...props} onChange={(e) => props.onChange(e.target.value)}/>),
                date: (props) => (<TailwindDate{...props} onChange={(e) => props.onChange(e.target.value)}/>)
                default: (props) => (<div>{props.type} not found</div>)
            }}
        >
            ...
        </FormConfigProvider>
    )
}
```

## Step 2: Create a Form

Use Form and the FormField components to create your Form:

```js
import { Form, FormField } from '@arkejs/form'

function Application() {
    const [loading, setLoading] = useState(false);
    const fields = [
        {
            id: "name",
            label: "Name",
            required: true,
            type: "string",
        },
        {
            id: "surname",
            label: "Surname",
            required: true,
            type: "string",
        },
        {
            id: "email",
            label: "Email",
            required: false,
            type: "string",
        },
        {
            id: "active",
            label: "Active",
            required: false,
            type: "boolean",
        },
        {
            id: "profile_image",
            label: "Profile image",
            required: false,
            type: "string",
        },
    ];
    
    return (
        <FormConfigProvider>
            <Form
                fields={fields}
                onSubmit={(values) => setData(values)}
                onChange={(values) => console.log(values)}
            >
                {({ fields }) =>
                    loading ? (
                        <Loader size={20} />
                    ) : (
                        <div>
                            <FormField id="name"/>
                            <FormField id="surname"/>
                            <FormField id="email"/>
                            <FormField id="active"/>
                        </div>
                    )}
            </Form>
        </FormConfigProvider>
    )
}
```

:::tip
You can create customized single FormField components through the `component` prop:

```js
<FormField 
    id="profile_image" 
    render={(props) => <ProfileImage {...props}/>} 
/>
```
:::

You can also use the Form without the general FormConfigProvider and use the `components` props to define the components
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