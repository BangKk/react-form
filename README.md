# react-form

## v0.0.2

```js
export default function App() {
  const form = Form.create({
    values: {},
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

  const onChange = (changeInfo) => {
    console.log("change", changeInfo, form.values);
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
```

## v0.0.1

```js
export default function App() {
  const form = Form.create({
    values: {},
    rules: {
      username: [(val) => val]
    },
    // 符合直觉的方式是将 onChange 作为 Form 组件的 props
    // 但是这里没有办法做到，因为 form 没有 change 事件
    // 并且 Form、Field、context 无法形成 onChange 在 Form props 上的闭环
    onChange: (...arg) => {
      console.log("change", ...arg);
    }
  });

  const onSubmit = () => {
    console.log("onSubmit", form.values);
  };

  const onReset = () => {
    console.log("reset", form.values);
  };

  return (
    <Form form={form} onSubmit={onSubmit} onReset={onReset}>
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
```
