import MonacoEditor, { useMonaco } from '@monaco-editor/react';

// 文档：https://github.com/suren-atoyan/monaco-react#readme
export default function CodeEditor({ value, onChange, ...restProps }: any) {
  return (
    <MonacoEditor
      width={'100%'}
      height="100%"
      theme={'vs-dark'}
      language="json"
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
}
