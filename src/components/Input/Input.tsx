import type { AnyFieldApi } from "@tanstack/react-form";

import "./Input.css";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const Input = ({ field, label, type = "text" }: { field: AnyFieldApi, label: string, type?: string }) => {
  return (
    <div className="field">
      <label htmlFor={field.name}>{label}:</label>
      <input
        className="field__input"
        id={field.name}
        autoComplete="off"
        name={field.name}
        type={type}
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value);
        }}
        onBlur={field.handleBlur}
      />
      <FieldInfo field={field} />
    </div>
  );
};

export default Input;
