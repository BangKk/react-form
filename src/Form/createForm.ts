import { useState } from "react";
import { Values, Rules, FormCore } from "./index";

interface FormOptions {
  values?: Values;
  rules?: Rules;
  onChange?: (key: string, val: string) => void;
}

const useForm = (options: FormOptions): FormCore => {
  let {
    values: v = {},
    rules: r = {}
  }: Pick<FormOptions, "values" | "rules"> = options;
  const [values, setValues] = useState(v);
  const [rules, setRules] = useState(r);
  const form = {
    values,
    rules,
    onChange(key: string, value: string) {
      setValues({
        ...values,
        [key]: value
      });
      console.log("context change", key, value, values);
    },
    reset() {
      form.values = {};
    }
  };
  return form;
};

export default useForm;
