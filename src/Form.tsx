import React, { useContext } from "react";
import { FormContext } from "./context";

interface Values {
  [key: string]: any;
}

interface Rule {
  triggle: "change" | "blur";
  validator: (val: any, vals: Values) => void | Promise<void>;
}

interface FormOptions {
  values?: Values;
  rules?: {
    [key: string]: Rule[];
  };
  onChange: (key: string, val: string) => void;
}

interface FormCore extends FormOptions {
  reset: () => void;
}

const Form = ({ form, onSubmit: submit, onReset: reset, children }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    submit(form.values);
  };
  const onReset = (e) => {
    form.reset();
    reset();
  };
  // form 由 createForm 创建，作为 context 的接收值
  return (
    <FormContext.Provider value={form}>
      <form onSubmit={onSubmit} onReset={onReset}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

const createForm = (options: FormOptions): FormCore => {
  let { values, rules, onChange } = options;
  const form = {
    values,
    rules,
    onChange(key, value) {
      values[key] = value;
      onChange(key, value, values);
    },
    reset() {
      form.values = {};
    }
  };
  return form;
};

const Field = ({ name, children }) => {
  const { values, onChange } = useContext(FormContext);
  const onFieldValueChange = (e) => {
    onChange(name, e.target.value);
  };

  const child = React.cloneElement(children, {
    onChange: onFieldValueChange,
    value: values[name]
  });

  return <>{child}</>;
};

Form.Field = Field;
Form.create = createForm;

export default Form;
