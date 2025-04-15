import type { FieldApi } from "@tanstack/react-form";

import "./Input.css";

function FieldInfo({ field }: { field: FieldApi<any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const Input = ({ field, label }: { field: FieldApi, label: string }) => {
  return (
    <div className="field">
      <label htmlFor={field.name}>{label}:</label>
      <input
        className="field__input"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      <FieldInfo field={field} />
    </div>
  );
};

export default Input;
