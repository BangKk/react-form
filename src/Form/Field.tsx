import React, { useContext } from "react";
import { FormContext } from "./context";

interface FieldProps {
  name: string;
  children: React.ReactNode;
}

const Field = ({ name, children }: FieldProps) => {
  const { values, onChange } = useContext(FormContext);
  console.log("render field", name, values[name]);
  const onFieldValueChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    onChange(name, value);
    target.dispatchEvent(
      new CustomEvent("form-change", {
        bubbles: true,
        detail: {
          change: {
            name,
            value
          }
        }
      })
    );
  };

  const child = React.isValidElement(children)
    ? React.cloneElement(children, {
        onChange: onFieldValueChange,
        value: values[name]
      })
    : null;

  return <>{child}</>;
};

export default Field;
