import "./styles.css";
import Form from "./Form";

export default function App() {
  const form = Form.create({
    values: {},
    rules: {
      username: [(val) => val]
    }
  });

  const onSubmit = () => {
    console.log("onSubmit");
    console.log(form.values);
  };

  const onReset = () => {
    console.log("reset");
    console.log(form.values);
  };

  const onChange = (...arg) => {
    console.log("change");
    console.log(...arg);
  };

  return (
    <Form form={form} onSubmit={onSubmit} onReset={onReset} onChange={onChange}>
      <Form.Field name="username">
        <input />
      </Form.Field>
      <Form.Field name="password">
        <input />
      </Form.Field>
      <button>submit</button>
      <button type="reset">reset</button>
    </Form>
  );
}
