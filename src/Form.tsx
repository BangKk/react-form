import React, { useContext, useRef, useEffect } from "react";
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

const Form = ({
  form,
  onSubmit: submit,
  onReset: reset,
  onChange: change,
  children
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    submit(form.values);
  };
  const onReset = (e) => {
    form.reset();
    reset();
  };
  const formRef = useRef();
  useEffect(() => {
    formRef.current.addEventListener("form-change", (e) => {
      change(e.detail.change);
    });
  }, []);
  // form 由 createForm 创建，作为 context 的接收值
  return (
    <FormContext.Provider value={form}>
      <form ref={formRef} onSubmit={onSubmit} onReset={onReset}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

const createForm = (options: FormOptions): FormCore => {
  let { values, rules } = options;
  const form = {
    values,
    rules,
    onChange(key, value) {
      values[key] = value;
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
    const { value } = e.target;
    onChange(name, value);
    e.target.dispatchEvent(
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

  const child = React.cloneElement(children, {
    onChange: onFieldValueChange,
    value: values[name]
  });

  return <>{child}</>;
};

Form.Field = Field;
Form.create = createForm;

export default Form;
