import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import Input from "./components/Input/Input";

import "./App.css";

const userSchema = z.object({
  firstName: z.string().min(3, "This field must be at least 3 characters long"),
  lastName: z.string().min(3, "This field must be at least 3 characters long"),
  age: z.preprocess(
    (val) => Number(val) || 0,
    z.number()
      .min(18, "You must be at least 18 years old")
      .max(100, "You must be less than 100 years old")
  ) as z.ZodType<number, number>,
  email: z.email("Invalid email"),
});

type User = z.infer<typeof userSchema>;

const defaultValues: User = {
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
};

const App = () => {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value));
    },
    validators: {
      onMount: userSchema,
      onChange: userSchema,
    },
  });

  return (
    <div className="app">
      <h1>Zod Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="app__form"
      >
        <form.Field
          name="firstName"
          children={(field) => <Input label="First Name" field={field} />}
        />
        <form.Field
          name="lastName"
          children={(field) => <Input label="Last Name" field={field} />}
        />
        <form.Field
          name="age"
          children={(field) => (
            <Input type="number" label="Age" field={field} />
          )}
        />
        <form.Field
          name="email"
          children={(field) => <Input label="Email" field={field} />}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button className="app__submit" type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default App;
