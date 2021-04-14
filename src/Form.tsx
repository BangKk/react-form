import React, { useContext, useRef, useEffect } from "react";
import { FormContext } from "./context";

interface Values {
    [key: string]: any;
}

interface Rule {
    triggle: "change" | "blur";
    validator: (val: any, vals: Values) => void | Promise<void>;
}

interface Rules {
    [key: string]: Rule[];
}

interface FormOptions {
    values?: Values;
    rules?: Rules;
    onChange?: (key: string, val: string) => void;
}

interface FormCore {
    values: Values;
    rules: Rules;
    reset: () => void;
    onChange: (key: string, val: string) => void;
}

export interface ChangeInfo {
    name: string;
    value: any;
}

interface FormProps {
    form: FormCore;
    onSubmit?: (values: Values) => void;
    onReset?: () => void;
    onChange?: (changeInfo: ChangeInfo) => void;
    children?: React.ReactNode;
}

interface FieldProps {
    name: string;
    children: React.ReactNode;
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
        submit && submit(form.values);
    };
    const onReset = () => {
        form.reset();
        reset && reset();
    };
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (formRef.current) {
            formRef.current.addEventListener("form-change", ((e: CustomEvent) => {
                change && change(e.detail.change);
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

const createForm = (options: FormOptions): FormCore => {
    let {
        values = {},
        rules = {}
    }: Pick<FormOptions, "values" | "rules"> = options;
    const form = {
        values,
        rules,
        onChange(key: string, value: string) {
            values[key] = value;
        },
        reset() {
            form.values = {};
        }
    };
    return form;
};

const Field = ({ name, children }: FieldProps) => {
    const { values, onChange } = useContext(FormContext);
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

Form.Field = Field;
Form.create = createForm;

export default Form;
