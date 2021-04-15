import "./styles.css";
import Form, { useForm, ChangeInfo } from "./Form";

export default function App() {
  const form = useForm({
    values: {
      username: "",
      password: ""
    },
    rules: {
      username: [(val) => val]
    }
  });

  const onSubmit = () => {
    console.log("onSubmit", form.values);
  };

  const onReset = () => {
    console.log("reset", form.values);
  };

  const onChange = (changeInfo: ChangeInfo) => {
    // console.log("change", changeInfo, form.values);
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
