---
title: Generating a form from a static schema with Vuejs
description: I share my knowledge about the front-end world here.
date: 2024-04-29
tags:
  - articles
  - vuejs
  - typescript
layout: layouts/articles.njk
---

# Generating a basic form from a static schema

For this tutorial, I assume you have some basic knowledge of Typescript, Javascript and Vuejs.

I use the Composition API and the script setup.

If you want to skip directly to the code, you can view the code <a href="https://github.com/CMarzin/form-generator" target="_blank">CMarzin/form-generator</a>.

1. <a href="#{{ '1. Create the config file' | slug }}">Create the config file</a>
  1.1 <a href="#{{ '1.1 Import your component' | slug }}">Import your component</a>
  1.2 <a href="#{{ '1.2 List the name of your inputs' | slug }}">List the name of your inputs</a>
  1.3 <a href="#{{ '1.2 Type your config' | slug }}">Type your config</a>
  1.4 <a href="#{{ '1.4 Write your config' | slug }}">Write your config</a>
2. <a href="#{{ '2. Create the schema of the form' | slug }}">Create the schema of the form</a>
  2.1 <a href="#{{ '2.1 Import your config' | slug }}">Import your config</a>
  2.2 <a href="#{{ '2.1 Create a shell of your data' | slug }}">Create a shell of your data</a>
  2.3 <a href="#{{ '2.3 Write your config schema' | slug }}">Write your config schema</a>
3. <a href="#{{ '3. Use your schema' | slug }}">Use your schema</a>


### 1. Create the config file

You can start by creating a `useFormConfig.ts` file inside a Composables folder.

 #### 1.1 Import your components

Replace the name of theses components with the one you want want to use.

```ts
// composables/useFormConfig.ts

import InputText from '@/components/InputText.vue';

```


#### 1.2 List the name of your inputs

To avoid, typo error and avoid duplicate string, you can to create a  `as const`  const in TS. This will create a readonly constante.

```ts
// composables/useFormConfig.ts

const inputConfigKey = {
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
} as const;

```

 #### 1.3 Type your config

Typing our config will enforce the style of your config object. If you use VSCode you will likely have a good support for TS out of the box.
With theses type, now when you will create your config, you will have the autocomplete of the props of the components and he will tell you if there is something wrong.

```ts
// composables/useFormConfig.ts

type ValueOf<Obj> = Obj[keyof Obj]; // little helper to get the ValueOf our const

type FormInputsComponents = typeof InputText;

/**
 * Why we Omit modelValue here ?
 * The modelValue props will be added directly in the template instead of in the config.
 * We can safely omit this required props.
 */

type InputTextProps = Omit<
  InstanceType<typeof InputText>['$props'],
  'modelValue'
>;

export interface baseFormInputComponents {
  name: ValueOf<typeof inputConfigKey>;
  required: boolean;
  label: string;
  props: InputTextProps;
  component: () => FormInputsComponents;
}

type InputConfigType = {
  [key in ValueOf<typeof inputConfigKey>]: baseFormInputComponents;
};

```

#### 1.4 Write your config

Here you will define what components and props to use for each input.

```ts
// composables/useFormConfig.ts

const inputConfig: InputConfigType = {
  [inputConfigKey.FIRST_NAME]: {
    required: true,
    name: inputConfigKey.FIRST_NAME,
    label: `First name`,
    props: {
      placeholder: `first name`,
      name: 'first name',
    },
    component: () => InputText,
  },
  [inputConfigKey.LAST_NAME]: {
    required: true,
    name: inputConfigKey.LAST_NAME,
    label: `Last name`,
    props: {
      placeholder: `last name`,
      name: 'last name',
    },
    component: () => InputText,
  },
}

export { inputConfigKey, inputConfig }

```

### 2. Create a file for using the config

You can create a `useFormFactory.ts` file inside a Composables folder.

 #### 1.1 Import your config

Import the config defined earlier.

```ts
// composables/useFormFactory.ts

import { inputConfigKey, inputConfig } from './useFormConfig';

const {
  FIRST_NAME,
  LAST_NAME,
} = inputConfigKey;

```

#### 1.2 Create a shell of the form data

In this function we list the data we want to get in our form.
For this form we want to use `first_name` and `last_name`.

```ts
// composables/useFormFactory.ts

// ...

function createEmptyFormValues() {
  return {
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
  };
}

```

#### 1.3 Create your form schema

Compose your schema with the inputConfig of your choices.

```ts
// composables/useFormFactory.ts

// ...

const userNameFormSchema = [
  inputConfig[FIRST_NAME],
  inputConfig[LAST_NAME],
];

export { createEmptyFormValues, userNameFormScheme, }

```

### 3. Use your schema

You can use your schema inside `.vue` file of your choices, for the sake of the demonstration we will use the schema directly in the `App.vue` file.

In this file we will :
1. Import the schema from the factory
2. Import the object to store the data of our form and make it reactive
3. Write the HTML of the form
4. The special balise `<component>` allow us to pass any `.vue` component of our choices

```html
<!-- App.vue -->

<script setup lang="ts">
import { ref } from 'vue';

import { userNameFormSchema, createEmptyFormValues } from '@/composables/dynamicForm/useFormFactory';

let baseInputsData = ref(createEmptyFormValues()); // ref will make our values reactive

let schema = userNameFormSchema

</script>

<template>
  <main>
    <form class="mt-2">
      <div
        v-for="(input, index) in schema"
        :key="`${input.name}-${index}`"
      >
        <label :for="input.name">{{ input.label }}
          <span v-if="input.required" style="color: red">*</span>
        </label>
        <component
          :is="input.component()"
          v-bind="input.props"
          v-model="baseInputsData[input.name]"
         />
      </div>
      <button type="submit" class="mt-2">Submit</button>
    </form>
	<pre class="mt-2">{{ baseInputsData }}</pre>
  </main>
</template>

<style scoped>
.mt-2 {
  margin-top: 2rem;
}
</style>

```

In the balise `pre` if you type in your input, you will see the data updating in real time.

That’s it for creating a basic form from a static schema.

If you want to pass the superior level, I invite you to check [FormKit ⚡️ The open-source form framework for Vue](https://formkit.com/).

For a better schema validation you can check [Valibot](https://valibot.dev/) or [Zod](https://zod.dev/)
