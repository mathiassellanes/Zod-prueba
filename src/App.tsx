import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { getUser } from "./api";
import Input from "./components/Input/Input";

import "./App.css";

const fieldRefined = z.string().refine(
  (str) => {
    if (str.length > 0) {
      return str.length >= 3;
    }

    return true;
  },
  {
    message: "This field must be at least 3 characters long",
  }
);

const userSchema = z.object({
  firstName: fieldRefined,
  lastName: fieldRefined,
  email: z
    .string()
    .email("Invalid email")
    .refine(
      async (value) => {
        try {
          const data = await getUser(value);

          console.log(data);
        } catch (error) {
          if (error.response.data.error === "Email is already in use") {
            return false;
          }

          return true;
        }

        return true;
      },
      {
        message: "Email already taken",
      }
    ),
});

type User = z.infer<typeof userSchema>;

const App = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    } as User,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    validators: {
      onChangeAsync: userSchema,
      onChangeAsyncDebounceMs: 300,
    },
  });

  form.update({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
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
