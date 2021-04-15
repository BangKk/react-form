import React, { useRef, useEffect } from "react";
import Field from "./Field";
import { FormContext } from "./context";
import useForm from "./createForm";

export interface Values {
  [key: string]: any;
}

export interface Rule {
  triggle: "change" | "blur";
  validator: (val: any, vals: Values) => void | Promise<void>;
}

export interface Rules {
  [key: string]: Rule[];
}

export interface FormCore {
  values: Values;
  rules: Rules;
  reset: () => void;
  onChange: (key: string, val: string) => void;
}

export interface ChangeInfo {
  name: string;
  value: any;
}

export interface FormProps {
  form: FormCore;
  onSubmit?: (values: Values) => void;
  onReset?: () => void;
  onChange?: (changeInfo: ChangeInfo) => void;
  children?: React.ReactNode;
}

const Form = ({
  form,
  onSubmit: submit,
  onReset: reset,
  onChange: change,
  children
}: FormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submit) {
      submit(form.values);
    }
  };
  const onReset = () => {
    form.reset();
    if (reset) {
      reset();
    }
  };
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formRef.current) {
      formRef.current.addEventListener("form-change", ((e: CustomEvent) => {
        if (change) {
          change(e.detail.change);
        }
      }) as EventListener);
    }
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

Form.Field = Field;

export default Form;
export { useForm };
